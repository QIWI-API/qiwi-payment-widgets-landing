import {h, Component} from 'preact';

import 'url-search-params-polyfill';

import Button from '../Button'
import {Container, Link, WidgetIframe, Title, WidgetCodeBlock, WidgetCodeTextarea} from "./styled";

export default class WidgetInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            codeIsHidden: true
        }
    }

    copyToClipboard = (code) => {

        this.widgetCodeBlock.value = code;

        this.widgetCodeBlock.select();

        this.props.addMessage('Код скопирован в буфер обмена');

        this.setState({
            codeIsHidden: false
        });


        document.execCommand("Copy");

    }

    render({widget, id, widgetUrl, noCacheFlag, publicKey}, {codeIsHidden}) {

        const {title, height, width, transparent, params = {}, link} = widget;

        params['publicKey'] = publicKey;

        const querystring = new URLSearchParams(params);

        let urlWidget = `${widgetUrl}${link}?${querystring.toString()}`;

        const code = `<iframe width="${width}" height="${height}" src="${urlWidget}" allowtransparency="true" scrolling="no" frameborder="0"></iframe>`;

        if (noCacheFlag) {
            urlWidget += `&noCache=${noCacheFlag}`;
        }

        return (<Container id={id}>
            <Title><Link href={`#${id}`}>{title}</Link></Title>

            <WidgetIframe width={width}
                          height={height}
                          src={urlWidget}
                          allowtransparency="true"
                          scrolling="no"
                          frameborder="0"/>

            <WidgetCodeTextarea innerRef={c => this.widgetCodeBlock = c}/>

            <Button onClick={() => {
                this.copyToClipboard(code);

                dataLayer.push({
                    'event': 'copy.code',
                    'eventAction': `Code of ${title} widget copied`
                });
            }} disabled={!publicKey} text={'Скопировать код'}/>

            {!codeIsHidden ?
                <WidgetCodeBlock>{`<iframe `}
                    src=<span>"{urlWidget}"</span> width=<span>"{width}"</span> height=<span>"{height}"</span>
                    allowTransparency=<span>"true"</span> scrolling=<span>"no"</span> frameBorder=<span>"0"</span>{`></iframe>`}
                </WidgetCodeBlock>
                : null}
        </Container>);
    }
}
