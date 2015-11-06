const utils = require('../utils.es6');

var helper = {
    play: (className, options) => {
        let classes = document.getElementsByClassName(className);
        for (let i = 0; i < classes.length; i++) {
            classes[i].onclick = function() {
                options.onVideoShow();
                let url = classes[i].getAttribute('data-ejs-url');
                let template = helper.template(url, options);
                classes[i].parentNode.parentNode.innerHTML = template;
            };
        }
    },

    template: (url, options) => {
        let dimensions = utils.dimensions(options);
        let template =
            `<div class="ejs-video-player">
        <iframe src="${url}" frameBorder="0" width="${dimensions.width}" height="${dimensions.height}"></iframe>
        </div>`;
        return template;
    },

    detailsTemplate: (data, embedUrl) => {
        var template =
            `<div class="ejs-video">
        <div class="ejs-video-preview">
        <div class="ejs-video-thumb" data-ejs-url="${embedUrl}">
        <img src="${data.thumbnail}" alt="${data.host}/${data.id}"/>
        <i class="fa fa-play-circle-o"></i>
        </div>
        <div class="ejs-video-detail">
        <div class="ejs-video-title">
        <a href="${data.url}">
        ${data.title}
        </a>
        </div>
        <div class="ejs-video-desc">
        ${data.description}
        </div>
        <div class="ejs-video-stats">
        <span>
        <i class="fa fa-eye"></i>${data.views}
        </span>
        <span>
        <i class="fa fa-heart"></i>${data.likes}
        </span>
        </div>
        </div>
        </div>
        </div>`;
        return template;
    },

    applyVideoJS: (options) => {
        let dimensions = utils.dimensions(options);
        options.videojsOptions.width = dimensions.width;
        options.videojsOptions.height = dimensions.height;
        if (options.videoJS) {
            if (!window.videojs) {
                throw new ReferenceError("You have enabled videojs but you haven't loaded the library.Find it at http://videojs.com/");
            }
            let elements = options.element.getElementsByClassName('ejs-video-js');
            for (let i = 0; i < elements.length; i++) {
                videojs(elements[i], options.videojsOptions, () => options.videojsCallback());
            }
        }
    },

    destroy: (className) => {
        let classes = document.getElementsByClassName(className)
        for (let i = 0; i < classes.length; i++) {
            classes[i].onclick = null
        }
    }
}

module.exports = helper;
