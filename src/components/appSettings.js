export default {
    idWidgetsBlock: 'widgets',
    widgetsLibrary: {
        /*пункты меню*/
        navigation: [{
            id: 'links',
            name: 'Ссылка',
            types: [ 'shortLink']
        },{
            id: 'widgets',
            name: 'Виджет',
            types: [ 'widget728x200', 'widget300x300', 'widget300x180']
        }, {
            id: 'buttons',
            name: 'Кнопка',
            types: ['bigButton']
        }],
        /*группы виджетов*/
        library: [{
            title: 'Для размещения в соцсетях',
            desc: 'Короткая ссылка на форму оплаты для размещения в социальных сетях, письмах, новостных сайтах и на других ресурсах, где размещение виджета невозможно.',
            types: ['shortLink']
        },{
            title: 'Большой информационный виджет',
            desc: '',
            types: ['widget728x200']
        }, {
            title: 'Небольшой виджет',
            desc: '',
            types: ['widget300x300', 'widget300x180']
        }, {
            title: 'Кнопка',
            desc: '',
            types: [ 'bigButton']
        }],
        /*виджеты и их параметры*/
        types: {
            'widget728x200': {
                /*название в меню*/
                name: '728px x 200px',
                /*ссылка на него*/
                link: 'widgets/big-widget-728x200',
                /* прозрачность фона*/
                transparent: false,
                /* название
                 * Почему отличаются?
                 * Птому что*/
                title: '728 px x 200 px с предвыбором сумм',
                height: 200,
                width: 728,
                form: 'widget',
                params: {

                }
            },
            'widget300x300': {
                name: '300px x 300px',
                link: 'widgets/middle-widget-300x300',
                transparent: false,
                title: '300 px x 300 px',
                height: 300,
                width: 300,
                form: 'widget',
                params: {

                }
            },
            'shortLink': {
                name: 'для соцсетей',
                link: 'shortLink',
                title: '',
                form: 'link'
            },
            'widget300x180': {
                name: '300px x 180px',
                link: 'widgets/small-widget-300x180',
                transparent: false,
                title: '300 px x 180 px',
                height: 180,
                width: 300,
                form: 'widget',
                params: {
                }
            },
            'smallButton': {
                name: 'маленькая',
                link: 'widgets/small-button-175x65',
                transparent: true,
                title: '175 px x 65 px маленькая на прозрачном фоне',
                height: 65,
                width: 175,
                form: 'widget',
                params: {
                }
            },
            'mediumButton': {
                name: 'средняя',
                link: 'widgets/middle-button-200x80',
                transparent: true,
                title: '200 px x 80 px средняя на прозрачном фоне',
                height: 80,
                width: 200,
                form: 'widget',
                params: {
                }
            },
            'bigButton': {
                name: '220px x 100px',
                link: 'widgets/big-button-220x100',
                transparent: true,
                title: '220 px x 100 px большая на прозрачном фоне',
                height: 100,
                width: 220,
                form: 'widget',
                params: {
                }
            }
        }
    }
};
