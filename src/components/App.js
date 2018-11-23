import {h, Component} from 'preact';

import 'url-search-params-polyfill';

import Header from './Header';
import About from './About';
import Widgets from './Widgets';
import MessageBox from './MessageBox';
import ThankingBlock from './ThankingBlock';
import QiwiFooter from './QiwiFooter';
import PageNotFound from './PageNotFound';
import appSettings from './appSettings';
import config from '../config/default';
import {stylesArrayToObject} from '../helpers/styles'

export default class App extends Component {

    constructor(props) {
        super(props);

        this.appSettings = appSettings;

        this.state = {
            message: '',
            widgetMerchantName: '',
            widgetAliasCode: '',
            merchantSitePublicKey: '',
            merchantContact: '',
            widgetStyles: {},
            merchantNotVeryfied: false,
            noCacheFlag: ''
        }
    }


    componentDidMount() {

        const self = this;

        const merchantSitePublicKey = this.getPublicKey();

        const widgetAliasCode = this.getAlias();

        const noCacheFlag = this.getNoCacheFlag();

        if (merchantSitePublicKey || widgetAliasCode) {
            this.getWidget(merchantSitePublicKey, widgetAliasCode, noCacheFlag).then(data => {
                if (data.result.widgetMerchantName) {
                    const widgetStyles = stylesArrayToObject(data.result.widgetStyles);

                    self.setState({
                        widgetMerchantName: data.result.widgetMerchantName,
                        merchantContact: data.result.widgetMerchantEmail,
                        widgetButtonText: data.result.widgetButtonText,
                        merchantOffer: data.result.widgetMerchantOffer,
                        widgetAliasCode: data.result.widgetAliasCode,
                        merchantSitePublicKey: data.result.merchantSitePublicKey,
                        widgetStyles,
                        noCacheFlag: noCacheFlag
                    });
                    self.changeTabTitle(data.result.widgetMerchantName);
                }
            });
        } else {

            self.setState({
                merchantNotVeryfied: true
            });

            dataLayer.push({
                'event': 'publickey.error',
                'eventAction': 'No public key'
            });
        }

    }

    getAlias = () => {
        return window.location.pathname.match(/([^\/]*)\/*$/)[1];
    }

    getPublicKey = () => {
        return new URLSearchParams(window.location.search).get('publicKey') || '';
    }

    getNoCacheFlag = () => {
        return new URLSearchParams(window.location.search).get('noCache') || '';
    }

    getWidget = (merchantSitePublicKey, widgetAliasCode, noCacheFlag) => {

        const self = this;

        let url = config.url + config.pathToApi;

        let params = `merchantSitePublicKey=${merchantSitePublicKey}`;


        if (widgetAliasCode && !merchantSitePublicKey) {
            params = `widgetAliasCode=${widgetAliasCode}`;
        }

        if (noCacheFlag) {
            params += `&noCache=${noCacheFlag}`;
        }

        return fetch(`${url}?${params}`, {
            mode: 'cors'
        })
            .then(response => {

                if (response.status >= 400) {

                    self.setState({
                        merchantNotVeryfied: true
                    });

                    dataLayer.push({
                        'event': 'load.error',
                        'eventAction': 'Widget info load error'
                    });

                    throw new Error('NotFoundError')
                }

                return response;

            })
            .then(response => response.json());
    }


    addMessage = (message) => {
        this.setState({
            message
        });

        this.deleteMessage();
    }

    changeTabTitle = (title) => {
        document.title = title;
    }

    deleteMessage = () => {
        setTimeout(() => {
            this.setState({
                message: ''
            });
        }, 2000);
    }

    analyticsHandler = (event, eventAction) => {
        dataLayer.push({
            event,
            eventAction
        });
    }

    render({}, {message, widgetMerchantName, widgetStyles, merchantSitePublicKey, widgetButtonText, merchantOffer, widgetAliasCode, merchantContact, merchantNotVeryfied, noCacheFlag}) {

        const {idWidgetsBlock} = this.appSettings;

        const contactDesc = 'Если вы хотите получить больше информации о возможностях сотрудничества, свяжитесь с нами:';

        if (merchantNotVeryfied) {
            return (<PageNotFound/>)
        }

        return (
            <div>
                <Header widgetStyles={widgetStyles} idWidgetsBlock={idWidgetsBlock}
                        widgetMerchantName={widgetMerchantName}
                        widgetButtonText={widgetButtonText} merchantOffer={merchantOffer}
                        publicKey={merchantSitePublicKey}/>
                <main>
                    <About/>
                    <Widgets {...this.appSettings} widgetUrl={config.widgetUrl} publicKey={merchantSitePublicKey}
                             noCacheFlag={noCacheFlag} widgetAliasCode={widgetAliasCode}
                             addMessage={this.addMessage}/>
                    {merchantContact ? <div class="thanking">
                        <div class="thanking__text">
                            <ThankingBlock email={merchantContact} contactDesc={contactDesc}
                                           onClick={this.analyticsHandler('make.email', 'Make email from thanking block')}/>
                        </div>
                    </div> : null}
                    <MessageBox message={message}/>
                </main>
                <QiwiFooter/>
            </div>);
    }
}
