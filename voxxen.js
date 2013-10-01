/* Use: 

    Voxxen.alert({
        onShow: fn
        onDismiss: fn
        onSubmit: fn
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
    var DOM = {
        createEl: function(tag) {
            return document.createElement(tag);
        },

        createText: function(text) {
            return document.createTextNode(text);
        }
    };

    var baseDialogue = {
        show: function() {
            var overlay = this.createOverlay();
            console.log(document.getElementsByTagName('body')[0])
            document.getElementsByTagName('body')[0].appendChild(overlay);
            overlay.appendChild(this.dialogue);
        },

        clear: function() {
            var content = document.getElementById('voxxen-overlay');
            content.parentNode.removeChild(content);
        },

        buildWrapper: function() {
            var outerDiv = DOM.createEl('div');
            outerDiv.className = 'voxxen-dialogue';

            var contentDiv = DOM.createEl('div');
            contentDiv.className = 'voxxen-content';

            var footerDiv = DOM.createEl('div');
            footerDiv.className = 'voxxen-footer';

            outerDiv.appendChild(contentDiv);
            outerDiv.appendChild(footerDiv);

            return outerDiv;
        },

        createOverlay: function() {
            var overlay = DOM.createEl('div');
            overlay.id = 'voxxen-overlay';
            return overlay;
        }
    };

    var alertDialogue = {
        init: {
            value: function(options) {
                this.config = options;
                this.build();
                this.show();
                return this;
            }
        },

        build: {
            value: function() {
                var outer = this.buildWrapper();

                outer.className = outer.className + ' voxxen-alert';

                var text = DOM.createEl('p').appendChild(DOM.createText(this.config.message));

                var confirmButton = DOM.createEl('button');
                confirmButton.textContent = 'Okay';
                confirmButton.className = 'voxxen-confirm';

                console.log(outer)
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
                this.config.onSubmit();
                this.destroy();
            }
        },

        destroy: {
            value: function() {
                this.clear(function() {
                
                }.bind(this));

                this.removeEventListeners();
            }
        }
    };

    var confirmDialogue = {
        init: function() {

        },

        build: function() {

        }
    };

    var promptDialogue = {
        init: function() {

        },

        build: function() {

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