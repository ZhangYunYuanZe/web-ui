module.exports = {
    template: require('appgrid.html'),
    data: function() {
        return {};
    },
    props: ["context", "social", "canUpgrade"],
    created: function() {
    },
    methods: {
        iconCount: function() {
            return 11 + (this.canUpgrade ? 1 : 0);
        },
        showChat: function() {
            this.$emit("chat");
        },
        showTour: function() {
            this.$emit("tour");
        },
        showOurFiles: function() {
            this.$emit("files", {path:[this.context.username]});
	},
        showFriendsFiles: function() {
            this.$emit("files", {path:[]});
        },
        showFeed: function() {
            this.$emit("news-feed");
        },
        showCalendar: function() {
            this.$emit("calendar");
        },
        showTodoBoard: function() {
            this.$emit("todo");
        },
        showTextEditor: function() {
            this.$emit("editor");
        },
        showSearch: function() {
            this.$emit("search");
        },
        showSocial: function() {
            this.$emit("social");
        },
        showProfile: function() {
            this.$emit("profile");
        },
        showUpgrade: function() {
            this.$emit("upgrade");
        }
    },
};
