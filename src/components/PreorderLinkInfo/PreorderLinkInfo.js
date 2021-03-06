import { h, Component } from 'preact';

import 'url-search-params-polyfill';

import {LinkInfoBlock, ButtonGetCode, LinkCodeTextarea, LinkTextBlock, LinkTitle} from "./styled";
import Button from '../Button'
import config from '../../config/default';
import Link from '../Link';


export default class PreorderLinkInfo extends Component {

    constructor(props) {
        super(props);
    }

    copyToClipboard = (code) => {

        this.widgetCodeBlock.value = code;

        this.widgetCodeBlock.select();

        this.props.addMessage('Cсылка скопирована в буфер обмена');

        document.execCommand("Copy");

    }

    render({ id, widgetAliasCode}, {}){

        const link = `${config.url}${widgetAliasCode}`;

        return (<LinkInfoBlock id={id}>
            <LinkTitle><a href={`#${id}`} target={'_blank'}/></LinkTitle>

            <LinkCodeTextarea innerRef={ c => this.widgetCodeBlock = c }/>

            <LinkTextBlock><Link href={link}>{link}</Link></LinkTextBlock>

            <Button type="button" disabled={!widgetAliasCode} onClick={() => {
                    this.copyToClipboard(link);

                     dataLayer.push({
                        'event': 'copy.code',
                        'eventAction': `Code of ${id} link copied`
                    });
                }} text={'Скопировать ссылку'}/>
        </LinkInfoBlock>);
    }
}
