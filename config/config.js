// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const {
  REACT_APP_API_SERVER,
  REACT_APP_WEBSITE_BUILDER,
  REACT_APP_BACKOFFICE,
  REACT_APP_ECOMMERCE,
} = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  define: {
    REACT_APP_API_SERVER: REACT_APP_API_SERVER || '',
    REACT_APP_WEBSITE_BUILDER: REACT_APP_WEBSITE_BUILDER || '',
    REACT_APP_BACKOFFICE: REACT_APP_BACKOFFICE || '',
    REACT_APP_ECOMMERCE: REACT_APP_ECOMMERCE || '',
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/loading/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.theme.primaryColor,
    'link-color': defaultSettings.theme.linkColor,
    'heading-color': defaultSettings.theme.headingColor,
    'text-color': defaultSettings.theme.textColor,
    'text-color-secondary': defaultSettings.theme.textColorSecondary,
    'disabled-color': defaultSettings.theme.disabledColor,
    'error-color': defaultSettings.theme.errorColor,
    'success-color': defaultSettings.theme.successColor,
    'warning-color': defaultSettings.theme.warningColor,
    'menu-bg-color': defaultSettings.theme.menuBgColor,
    'menu-color': defaultSettings.theme.menuColor,
    'menu-active-color': defaultSettings.theme.menuActiveColor,
    'menu-icon-color': defaultSettings.theme.menuIconColor,
    'menu-icon-active-color': defaultSettings.theme.menuIconActiveColor,
    'card-border-color': defaultSettings.theme.cardBorderColor,
    'border-radius-base': defaultSettings.theme.borderRadiusBase,
    'border-color-base': defaultSettings.theme.borderColorBase,
    'box-shadow-base': defaultSettings.theme.boxShadowBase,
    'font-size-base': defaultSettings.theme.fontSizeBase,
    'font-size-h1': defaultSettings.theme.fontSizeH1,
    'font-size-h2': defaultSettings.theme.fontSizeH2,
    'font-size-h3': defaultSettings.theme.fontSizeH3,
    'font-size-h4': defaultSettings.theme.fontSizeH4,
    'font-size-h5': defaultSettings.theme.fontSizeH5,
    'font-size-h6': defaultSettings.theme.fontSizeH6,
    'font-size-label': defaultSettings.theme.fontSizeLabel,
    'font-size-title': defaultSettings.theme.fontSizeTitle,
    'font-size-button': defaultSettings.theme.fontSizeButton,
    'font-size-button-group': defaultSettings.theme.fontSizeButtonGroup,
    'font-size-stat-title': defaultSettings.theme.fontSizeStatTitle,
    'font-size-badge': defaultSettings.theme.fontSizeBadge,
    'spacing-base': defaultSettings.theme.spacingBase,
    'white-color': defaultSettings.theme.whiteColor,
    'black-color': defaultSettings.theme.blackColor,

    'border-color-1': defaultSettings.theme.borderColor1,
    'border-color-2': defaultSettings.theme.borderColor2,
    'completed-color': defaultSettings.theme.completedColor,

    'status-active-color': defaultSettings.theme.statusActiveColor,
    'status-sent-color': defaultSettings.theme.statusSentColor,
    'status-inactive-color': defaultSettings.theme.statusInactiveColor,
    'status-ended-color': defaultSettings.theme.statusEndedColor,
    'status-failed-color': defaultSettings.theme.statusFailedColor,
    'status-pending-color': defaultSettings.theme.statusPendingColor,
    'status-saved-color': defaultSettings.theme.statusSavedColor,
    'status-hidden-color': defaultSettings.theme.statusHiddenColor,
    'status-success-color': defaultSettings.theme.statusSuccessColor,
    'status-confirmed-color': defaultSettings.theme.statusConfirmedColor,
    'status-shipped-color': defaultSettings.theme.statusShippedColor,
    'status-refunded-color': defaultSettings.theme.statusRefundedColor,
    'status-completed-color': defaultSettings.theme.statusCompletedColor,
    'status-cancelled-color': defaultSettings.theme.statusCancelledColor,
    'user-retail-color': defaultSettings.theme.userRetailColor,
    'user-affiliate-color': defaultSettings.theme.userAffiliateColor,
    'user-preferred-color': defaultSettings.theme.userPreferredColor,
    'user-pre-enrollee-color': defaultSettings.theme.userPreEnrolleeColor,

    'custom-color-1': defaultSettings.theme.customColor1,
    'custom-color-2': defaultSettings.theme.customColor2,
    'custom-color-3': defaultSettings.theme.customColor3,
    'custom-color-4': defaultSettings.theme.customColor4,
    'custom-color-5': defaultSettings.theme.customColor5,
    'custom-color-6': defaultSettings.theme.customColor6,
    'custom-color-7': defaultSettings.theme.customColor7,
    'custom-color-8': defaultSettings.theme.customColor8,
    'custom-color-9': defaultSettings.theme.customColor9,
    'custom-color-10': defaultSettings.theme.customColor10,
    'custom-color-11': defaultSettings.theme.customColor11,
    'custom-color-12': defaultSettings.theme.customColor12,
    'custom-color-13': defaultSettings.theme.customColor13,
    'custom-color-14': defaultSettings.theme.customColor14,
    'custom-color-15': defaultSettings.theme.customColor15,
    'custom-color-16': defaultSettings.theme.customColor16,
    'custom-color-17': defaultSettings.theme.customColor17,
    'custom-border-1': defaultSettings.theme.customBorderColor1,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy['dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
