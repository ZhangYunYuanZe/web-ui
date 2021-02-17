module.exports = {
    template: require('social-post.html'),
    data: function() {
        return {
            showSpinner: false,
            title: "Post a Message",
            textAreaPlaceholder: "Type in here...",
            shareWith: "Friends",
            post: ""
        }
    },
    props: ['closeSocialPostForm', 'socialFeed', 'context', 'showMessage', 'groups', 'socialPostAction', 'currentSocialPostTriple'],
    created: function() {
        let that = this;
        if (this.socialPostAction == 'edit') {
            this.post = this.currentSocialPostTriple.middle.body;
            this.context.sharedWith(this.currentSocialPostTriple.left).thenApply(function(sharedWith) {
                let readAccess = sharedWith.readAccess.toArray([]);
                if (readAccess[0] == that.getGroupUid(peergos.shared.user.SocialState.FRIENDS_GROUP_NAME)) {
                    that.shareWith = "Friends";
                } else if(readAccess[0] == that.getGroupUid(peergos.shared.user.SocialState.FOLLOWERS_GROUP_NAME)) {
                    that.shareWith = "Followers";
                }
            });
        }
    },
    methods: {
        close: function (result) {
            this.closeSocialPostForm(null, null);
        },
        getGroupUid: function(groupName) {
            return this.groups.groupsNameToUid[groupName];
        },
        submitPost: function() {
            let that = this;
            that.showSpinner = true;
            let groupUid = this.shareWith == 'Friends' ? this.getGroupUid(peergos.shared.user.SocialState.FRIENDS_GROUP_NAME)
                        : this.getGroupUid(peergos.shared.user.SocialState.FOLLOWERS_GROUP_NAME);
            let resharingType = this.shareWith == 'Friends' ? peergos.shared.social.SocialPost.Resharing.Friends
                                    : peergos.shared.social.SocialPost.Resharing.Followers;
            if (this.socialPostAction == 'add') {
                this.addPost(groupUid);
            } else if(this.socialPostAction == 'edit') {
                this.editPost(groupUid);
            } else if(this.socialPostAction == 'reply') {
                this.replyToPost(groupUid, resharingType);
            }
        },
        addPost: function(groupUid) {
           let tags = peergos.client.JsUtil.emptyList();
           let type = peergos.shared.social.SocialPost.Type.Text;
           let socialPost = new peergos.shared.social.SocialPost.createInitialPost(type, this.context.username, this.post, tags);
           this.savePost(socialPost, groupUid);
        },
        editPost: function(groupUid) {
            let that = this;
            let tags = peergos.client.JsUtil.emptyList();
            let postTime = peergos.client.JsUtil.now();
            let references = peergos.client.JsUtil.emptyList();
            let socialPost = this.currentSocialPostTriple.middle.edit(this.post, tags, postTime, references);
            this.savePost(socialPost, groupUid);
        },
        replyToPost: function(groupUid, resharingType) {
            let that = this;
            let type = peergos.shared.social.SocialPost.Type.Text;
            let path = this.currentSocialPostTriple.left;
            let cap = this.currentSocialPostTriple.right;
            this.generateContentHash(this.currentSocialPostTriple.middle).thenApply(function(hash) {
                let tags = peergos.client.JsUtil.emptyList();
                let parent = new peergos.shared.social.SocialPost.Ref(path, cap, hash);
                let replyPost = peergos.shared.social.SocialPost.createComment(parent, resharingType, type, that.context.username, that.post, tags);
                that.savePost(replyPost, groupUid);
            });
        },
        generateContentHash: function(entry) {
            let future = peergos.shared.util.Futures.incomplete();
            let isPost = entry.owner != null;//social post has a .owner, filewrapper has .ownername
            if (isPost) {
                entry.contentHash(this.context.crypto.hasher).thenApply(function(hash) {
                    future.complete(hash);
                });
            } else {
                //TODO create hash for files
               let tags = peergos.client.JsUtil.emptyList();
               let type = peergos.shared.social.SocialPost.Type.Text;
               let dummySocialPost = new peergos.shared.social.SocialPost.createInitialPost(type, this.context.username, "", tags);
                dummySocialPost.contentHash(this.context.crypto.hasher).thenApply(function(hash) {
                    future.complete(hash);
                });
            }
            return future;
        },
        savePost: function(socialPost, groupUid) {
           let that = this;
           this.socialFeed.createNewPost(socialPost).thenApply(function(result) {
               that.context.shareReadAccessWith(result.left, peergos.client.JsUtil.asSet([groupUid])).thenApply(function(b) {
                       that.showSpinner = false;
                       that.closeSocialPostForm({left: result.left, middle: socialPost, right: result.right}
                            , that.currentSocialPostTriple == null ? null : that.currentSocialPostTriple.left);
                   }).exceptionally(function(err) {
                       that.showSpinner = false;
                       that.showMessage(err.getMessage());
               });
            }).exceptionally(function(throwable) {
                that.showMessage(throwable.getMessage());
                that.showSpinner = false;
            });
        },
    }
}
