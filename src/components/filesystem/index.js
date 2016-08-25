module.exports = {
    template: require('filesystem.html'),
    data: function() {
        return {
	    context: null,
            path: [],
	    grid: true
        };
    },
    props: {
    },
    created: function() {
        console.debug('Filesystem module created!');
        
    },
    methods: {
        goBackToLevel: function(level) {
            // By default let's jump to the root.
            var newLevel = level || 0,
                path = this.path.slice(0, newLevel).join('/');

            if (newLevel < this.path.length) {
                this.changePath(path);
            }
        },

        changePath: function(path) {
            console.debug('Changing to path:'+ path);
	    if (path.startsWith("/"))
		path = path.substring(1);
            this.path = path ? path.split('/') : [];
        },

	navigateToSubdir: function(name) {
	    this.changePath(this.getPath() + name);
	},

        getPath: function() {
            return '/'+this.path.join('/') + (this.path.length > 0 ? "/" : "");
        }
    },
    computed: {
        sortedFiles: function() {
	    console.log(this.files);
	    if (this.files == null)
		return [];
            return this.files.slice(0).sort(function(a, b) {
                if (a.type !== b.type) {
                    if (a.type === 'dir') {
                        return -1;
                    } else {
                        return 1;
                    }
                } else {
                    if (a.name < b.name) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            });
        }
    },
    asyncComputed: {
	currentDir: function() {
	    if (this.context == null)
		return Promise.resolve(null);
	    return this.context.getByPath(this.getPath());
	},
	files: function() {
            var current = this.currentDir;
	    if (current == null)
		return Promise.resolve([]);
	    return current.getChildren(this.context).then(function(children){
		return children.toArray().then(function(arr) {
		    var futures = [];
		    for (var i=0; i < arr.length; i++) {
			futures[i] = convertToJSFile(arr[i]);
		    }
		    return Promise.all(futures);
		});
	    });
        }
    },
    events: {
	'parent-msg': function (msg) {
	    // `this` in event callbacks are automatically bound
	    // to the instance that registered it
	    this.context = msg.context;
	}
    }
};
