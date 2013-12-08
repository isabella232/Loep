window.App = window.App || {};

// See templates/default-template.html for how it will be rendered
App.exampleScenes = [
    {
        "name": "the first scene",
        "elements": [
            {
                "image": "images/example1.jpg",
                "title": "<b>title</b><br/> of element",
                "description": "Description of the element in the default template. <br/> if this is set, the element will also be highlighted when stepping through"
            },
            {
                "image": "images/calendar42_logo.png"
            },
            {
                "title": "Text only element"
            }
        ]
    },
    {
        "name": "the second scene",
        "elements": [
            {
                "image": "images/example2.jpg"
            },
            {
                "image": "images/example1.jpg"
            },
            {
                "image": "images/example3.jpg"
            },
            {
                "title": "Another element"
            },
            {
                "title": "Element with description",
                "description": "This is very important! Yes it is!"
            }
        ]
    },
    {
        "name": "the third scene",
        "elements": [
            {
                "image": "images/example3.jpg"
            },
            {
                "image": "images/example2.jpg"
            }
        ]
    },
    {
        "name": "The fourth scene, using a custom template",
        "template": "custom-scenes/example-custom-template.html",
        "customContext" : "This is custom context"
    }
];

App.scenes = App.exampleScenes;