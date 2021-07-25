# UI Development Guide

### Design Principals  

Please use default theme variables for colors, font-sizes as possible, rather than inline styles, component-specific css. If you need to add more theme colors, font sizes, sizes for components, please contact to our design team lead and request to add new variables.

##### Theme Colors

file: `config/defaultSettings.js`, `config/config.js`

- @primary-color: it will replace default primary color of antd theme
- @error-color, @warning-color, @success-color: it will replace default status color of antd theme
- @text-color: default text color
- @text-color-secondary: secondary text color
- @disabled-color: disabled color
- @menu-color, @menu-bg-color, @menu-active-color, @menu-icon-color, @menu-icon-active-color: menu colors Also there are basic font sizes too. (it needs to add more content for new colors later.)

##### Font Sizes

file: `config/defaultSettings.js`, `config/config.js`

- @font-size-h1, @font-size-h2, @font-size-h3, @font-size-h4, @font-size-h5, @font-size-h6, @font-size-base: base font sizes
- @font-size-label: Label's font size
- @font-size-title: Font size of panel title, card title, form title
- @font-size-button: Font size of button
- @font-size-badge: Font size of status badge

##### Sizes

file: `config/defaultSettings.js`, `config/config.js`

- @box-shadow-base: base box shadow
- @border-radius-base: border radius of panel
- @spacing-base: space between sections/panels, padding space of page main content

### Design Requirements

Please follow and fix all not matching ui components.

- Panel border radius: 0 ![design requirements](https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/tutorial/a11.png)
- Panel Title: All Panel & Card's title/ Form's title font-size: @font-size-title color: @text-color
- Panel inner padding should be 18px
- All spacing between sections/panels should be 15px ![design requirements](https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/tutorial/a15.png)
- Status Panel's title font-size: @font-size-stat-title color: @text-color-secondary ![design requirements](https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/tutorial/a16.png)
- Table column height height: 52px
- Country flag Always shows country name Flag should be rectangle, not round-border ![design requirements](https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/tutorial/a19.png)
- Keep image width/height ratio always
- User Search Page Spacing between form inputs should be 24px On All pages, form label margin-bottom: 3px, Label should be font-size: @font-size-label, color: @text-color ![design requirements](https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/tutorial/a21.png)
- Change All buttons on card/panel view, table actions, to outline button. ![design requirements](https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/tutorial/a22.png)
- Status Badge min-width: 70px height: 27px; display: flex; align-items: center; justify-content: center; font-size: @font-size-badge; color: white; font-weight: bold; text-transform: uppercase; ![design requirements](https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/tutorial/a23.png)
- Space between top bar and below components should be 15px ![design requirements](https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/tutorial/a24.png)

#### Utility Functions

##### Text Utilities

- asPrice - it will show currency format from number
- asNumber - it will show locale-specified number format
- asPercent - it will show percent
- asDate - it will show date format - `MM/DD/YY`

##### Get Token

These methods are defined on `/src/utils/localStorage.js` file. Most usage functions are `getUser()` & `getToken()`.

#### API Method Rule

Here is example.

```javascript
import request from '@/utils/request';

const PRODUCT_ROUTE = 'products';

export function createProductApi(data, callback, failCallback) {
  return request(PRODUCT_ROUTE, {
    method: 'POST',
    data: data,
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function deleteProductApi(id, callback, failCallback) {
  return request(`${PRODUCT_ROUTE}/${id}`, {
    method: 'DELETE',
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}

export function searchProductsApi(params, callback, failCallback) {
  return request(`${PRODUCT_ROUTE}`, {
    method: 'GET',
    params: params,
  }).then(({ data, response }) => {
    if (response) {
      callback(data);
    } else {
      failCallback();
    }
  });
}
```

You can not create api files on `/src/services` folder without permitting from design team lead.

#### Menu Example

file - `config/routes.js` route parameters

- path: url path
- component: page file
- auth: it will be used for permission management later.
- hideInMenu: if true, it will not show on left-menu sidebar.

#### System Variables

folder: `/src/common/var` ~Options - it will be used as basic enum and options for select box.

- User (file: `./user.js`)
  - User Type: userTypeOptions, userTypeText
  - User Status: userStatusOptions, userStatusText
- Order (file: `./order.js`)
  - Order Type: orderTypeOptions, orderTypeText
  - Order Status: orderStatusOptions, orderStatusText It needs to add more content for new system variables later.

For all status & const variables on design, should be defined on src/common/var/. Please contact to our design team lead if you have some const variables on pages you are working.

---

### Rule Principals

- We use Antd Pro as basic UI framework.
- We don't use redux anymore, because it's time-wasting on development progress. And on our system, there is no need to share data between pages/components. We will use localStorage for storing global system variable instead of redux/reducer. Currently it will be used only for storing logged-in user information, including `token`.(here is [sample](#get-token) how to get token from localStorage)
- We use only functional stateless react component, please don't use class component.
- On Component, it will be used only `useState`, `useEffect` hook, we don't allow to use `useReducer` hook.
- For chart components, we should use antd chart. https://charts.ant.design/demos/global

### Project Structure

- `/config` Theme setting informations.
  - Page title
  - [Theme colors](#theme-colors)
  - [Menus](#menu-example)
- `/src/components` Common components reusable on multiple components.
- `/src/pages` It will have all pages and components on pages, main work directory. First level directory is equal to first level menus on left menu sidebar. All Components on this folder should follow on our restrict [component naming rule](#component).
- `/src/layouts` There are 2 layouts,
  - One is `auth` layout for pages able to access when not logged in like _login_, _reset password_ pages.
  - Another one is `admin` layout for admin pages. Pages with `admin` layout should be allowed to only logged in users.
- `/src/services` Functions for calling api. Here is [rule](#api-method-rule) how to make api entry points.
- `/src/locales` It's multi-language support directory, our system supports multi-language, and all titles/labels/button lables/column names should have saved on language files, especially success & error messages on api call.
- `/src/utils` Here is collection of [utility methods](#utility-functions).
- `/src/common`
  - `./data` test data for initial test development step. static data like country list
  - `./var` System variables will be [here](#system-variables).
- `global.less` CSS for global usage.

### Common Practice

#### Component

All Component should have meaningful, profound, and simple name.

- All components on `/src/pages` directory should suffix. Here are most common suffix;
  - if component is just page component itself, (ie it will be called on routes) it should have ~~Page, And it should have PageContainer wrapper on file.![page component sample](https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/tutorial/a1.png)
  - Sub pages should have suffix ~SubPage. ![subpage component sample](https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/tutorial/a2.png)
  - Forms - Forms with inputs, Panels - Section with white background panel, Charts, Tables...
- We should import components on `/src/components` only. Not allowed to import components from **antd** or **antd pro**. ![components index folder](https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/tutorial/a3.png) We have declared almost components using on our system from antd, and if you need to use one more component, please define that here.

#### Global CSS and Component CSS

- Declare global css to `/src/global.less` file.
- Write component-independent css to `{ComponentName}.less` file on same directory of component.
- On Component css file, you can define some global css,, because child components will not accept style defined on parent component, but don't forget to put unique wrapper for component. Here is example ![component css](https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/tutorial/a4.png)
