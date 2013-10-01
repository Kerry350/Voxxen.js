/* Use: 

    Voxxen.alert({
        onShow: fn
        onDismiss: fn
        onSubmit: fn
        animate: boolean
        outerClass: string or array
    })

*/

(function(root) {

    var baseDialogue = {
        show: function() {

        },

        clear: function() {

        },

        build: function() {

        }
    };

    var alertDialogue = {

    };

    var confirmDialogue = {

    };

    var promptDialogue = {

    };

    var Voxxen = (function() {

        function createAlert() {
            var alert = Object.create(baseDialogue, alertDialogue);
            return alert.init();
        }

        function createConfirm() {
            var confirm = Object.create(baseDialogue, confirmDialogue);
            return confirm.init();
        }

        function createPrompt() {
            var prompt = Object.create(baseDialogue, promptDialogue);
            return prompt.init();
        }

        return {
            alert: function(options) {
                return createAlert();
            },

            confirm: function(options) {
                return createConfirm();
            },

            prompt: function(options) {
                return createPrompt();
            }
        }
    })(); 

    root.Voxxen = Voxxen;



})(window);