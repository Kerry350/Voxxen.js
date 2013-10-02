Voxxen.js
=========

Seriously pain-free dialogues (alert, prompt and confirm)

# Dependencies

Zilch.

# How to use

## Alert

```
Voxxen.alert({
    onHide: function() {
        console.log("Alert dialogue has been cleared");
    },

    onDecision: function() {
        console.log("Okay button pressed or dialogue cleared");
    },

    message: 'This is an alert'
});
```

## Confirm

```
Voxxen.confirm({
    onHide: function() {
        console.log("Confirm dialogue has been cleared");
    },

    onDecision: function(decision) {
        console.log("Decision is " + decision);
    },
    
    message: 'Are you sure you want to delete that?'
});
```

## Prompt
```
Voxxen.prompt({
    onHide: function() {
        console.log("Prompt dialogue has been cleared");
    },

    onDecision: function(value) {
        console.log("Value is " + value);
    },
    
    message: 'What would you like to name this?'
});
```
# Credits

* Eli Grey for his classList.js shim 
* Dan Eden for the CSS animations used from animate.css
