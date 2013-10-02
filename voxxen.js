/* Use: 

    Voxxen.alert({
        onShow: fn
        onHide: fn
        onDecision: fn
        animate: boolean
        outerClass: string or array
        message: string
    });

    <div id="voxxen-overlay">
        <div class="voxxen-dialogue voxxen-alert">
            <div class="voxxen-content">
                <p>Alert message</p>
            </div>

            <div class="voxxen-footer">
                <button class="voxxen-button voxxen-confirm">Okay</button>
            </div>
        </div>
    </div>

*/

(function(root) {
    
    // ClassList shim
    /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
    if(typeof document!=="undefined"&&!("classList" in document.createElement("a"))){(function(j){if(!("HTMLElement" in j)&&!("Element" in j)){return}var a="classList",f="prototype",m=(j.HTMLElement||j.Element)[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.className),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.className=this.toString()}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};
    
    function addPrefixedEvent(element, type, callback) {
        var prefixes = ["webkit", "moz", "MS", "o", ""];

        for (var i = 0; i < prefixes.length; i++) {
            if (!prefixes[i]) type = type.toLowerCase();
            element.addEventListener(prefixes[i]+type, callback, false);
        }
    }

    function removePrefixedEvent(element, type, callback) {
        var prefixes = ["webkit", "moz", "MS", "o", ""];

        for (var i = 0; i < prefixes.length; i++) {
            if (!prefixes[i]) type = type.toLowerCase();
            element.removeEventListener(prefixes[i]+type, callback, false);
        }
    }

    var DOM = {
        createEl: function(tag) {
            return document.createElement(tag);
        },

        createText: function(text) {
            return document.createTextNode(text);
        }
    };

    var baseDialogue = {
        init: function(options) {
            this.config = options;
            this.build();
            this.show();
            return this;
        },

        show: function() {
            var overlay = this.createOverlay();
            console.log(document.getElementsByTagName('body')[0])
            document.getElementsByTagName('body')[0].appendChild(overlay);
            overlay.appendChild(this.dialogue);
            overlay.classList.add('fadeIn');
        },

        clear: function() {
            function onAnimationEnd() {
                removePrefixedEvent(content, "AnimationEnd", onAnimationEnd);
                content.parentNode.removeChild(content);
                
                if (this.config.onHide) {
                    this.config.onHide();
                }
            }

            var content = document.getElementById('voxxen-overlay');
            addPrefixedEvent(content, "AnimationEnd", onAnimationEnd.bind(this));
            content.classList.remove('fadeIn');
            content.classList.add('fadeOut');
        },

        buildWrapper: function() {
            var outerDiv = DOM.createEl('div');
            outerDiv.classList.add('voxxen-dialogue');

            var contentDiv = DOM.createEl('div');
            contentDiv.classList.add('voxxen-content');

            var footerDiv = DOM.createEl('div');
            footerDiv.classList.add('voxxen-footer');

            outerDiv.appendChild(contentDiv);
            outerDiv.appendChild(footerDiv);

            return outerDiv;
        },

        createOverlay: function() {
            var overlay = DOM.createEl('div');
            overlay.id = 'voxxen-overlay';
            return overlay;
        },

        destroy: function() {
            this.clear(function() {
            
            }.bind(this));

            this.removeEventListeners();
        }
    };

    var alertDialogue = {
        build: {
            value: function() {
                var outer = this.buildWrapper();

                outer.classList.add('voxxen-alert');

                var text = DOM.createEl('p').appendChild(DOM.createText(this.config.message));

                var confirmButton = DOM.createEl('button');
                confirmButton.textContent = 'Okay';
                confirmButton.classList.add('voxxen-confirm');

                outer.querySelector('.voxxen-content').appendChild(text);
                outer.querySelector('.voxxen-footer').appendChild(confirmButton);

                this.dialogue = outer;

                this.addEventListeners();
            }
        },

        addEventListeners: {
            value: function() {
                this.dialogue.querySelector('.voxxen-confirm').addEventListener('click', this.onConfirm.bind(this));
            }
        },

        removeEventListeners: {
            value: function() {
                this.dialogue.querySelector('.voxxen-confirm').removeEventListener('click', this.onConfirm.bind(this));
            }
        },

        onConfirm: {
            value: function() {
                this.config.onDecision();
                this.destroy();
            }
        }
    };

    var confirmDialogue = {
        build: {
            value: function() {
                var outer = this.buildWrapper();

                outer.classList.add('voxxen-alert');

                var text = DOM.createEl('p').appendChild(DOM.createText(this.config.message));

                var confirmButton = DOM.createEl('button');
                confirmButton.textContent = 'Okay';
                confirmButton.classList.add('voxxen-confirm');

                var cancelButton = DOM.createEl('button');
                cancelButton.textContent = 'Cancel';
                cancelButton.classList.add('voxxen-cancel');

                outer.querySelector('.voxxen-content').appendChild(text);
                outer.querySelector('.voxxen-footer').appendChild(confirmButton);
                outer.querySelector('.voxxen-footer').appendChild(cancelButton);

                this.dialogue = outer;

                this.addEventListeners();
            }
        },

        addEventListeners: {
            value: function() {
                this.dialogue.querySelector('.voxxen-confirm').addEventListener('click', this.onConfirm.bind(this));
                this.dialogue.querySelector('.voxxen-cancel').addEventListener('click', this.onCancel.bind(this));
            }
        },

        removeEventListeners: {
            value: function() {
                this.dialogue.querySelector('.voxxen-confirm').removeEventListener('click', this.onConfirm.bind(this));
                this.dialogue.querySelector('.voxxen-cancel').removeEventListener('click', this.onCancel.bind(this));
            }
        },

        onConfirm: {
            value: function() {
                this.config.onDecision(true);
                this.destroy();
            }
        },

        onCancel: {
            value: function() {
                this.config.onDecision(false);
                this.destroy();
            }
        }
    };

    var promptDialogue = {
        build: {
            value: function() {
                var outer = this.buildWrapper();

                outer.classList.add('voxxen-alert');

                var text = DOM.createEl('p').appendChild(DOM.createText(this.config.message));

                var input = DOM.createEl('input');

                var confirmButton = DOM.createEl('button');
                confirmButton.textContent = 'Okay';
                confirmButton.classList.add('voxxen-confirm');

                var cancelButton = DOM.createEl('button');
                cancelButton.textContent = 'Cancel';
                cancelButton.classList.add('voxxen-cancel');

                outer.querySelector('.voxxen-content').appendChild(text);
                outer.querySelector('.voxxen-content').appendChild(input);
                outer.querySelector('.voxxen-footer').appendChild(confirmButton);
                outer.querySelector('.voxxen-footer').appendChild(cancelButton);

                this.dialogue = outer;

                this.addEventListeners();
            }
        },

        addEventListeners: {
            value: function() {
                this.dialogue.querySelector('.voxxen-confirm').addEventListener('click', this.onConfirm.bind(this));
                this.dialogue.querySelector('.voxxen-cancel').addEventListener('click', this.onCancel.bind(this));
            }
        },

        removeEventListeners: {
            value: function() {
                this.dialogue.querySelector('.voxxen-confirm').removeEventListener('click', this.onConfirm.bind(this));
                this.dialogue.querySelector('.voxxen-cancel').removeEventListener('click', this.onCancel.bind(this));
            }
        },

        onConfirm: {
            value: function() {
                var value = this.dialogue.querySelector('input').value.trim();
                this.config.onDecision(value);
                this.destroy();
            }
        },

        onCancel: {
            value: function() {
                this.config.onDecision(false);
                this.destroy();
            }
        } 
    };

    var Voxxen = (function() {

        function createAlert(options) {
            var alert = Object.create(baseDialogue, alertDialogue);
            console.log(alert)
            return alert.init(options);
        }

        function createConfirm(options) {
            var confirm = Object.create(baseDialogue, confirmDialogue);
            return confirm.init(options);
        }

        function createPrompt(options) {
            var prompt = Object.create(baseDialogue, promptDialogue);
            return prompt.init(options);
        }

        return {
            alert: function(options) {
                return createAlert(options);
            },

            confirm: function(options) {
                return createConfirm(options);
            },

            prompt: function(options) {
                return createPrompt(options);
            }
        }
    })(); 

    root.Voxxen = Voxxen;

})(window);