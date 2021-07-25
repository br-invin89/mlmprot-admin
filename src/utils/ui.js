export const getPageTitle = (context) => {
  let pageTitle = '';
  if (context.breadcrumb && context.breadcrumb[context.location.pathname]) {
    pageTitle = context.breadcrumb[context.location.pathname].name;
  }
  if (context.location.pathname.indexOf('/user/detail') >= 0) {
    // const userId = context.location.pathname.substring(context.location.pathname.lastIndexOf("/") + 1, context.location.pathname.length)
    pageTitle = `User Information`;
  }
  if (context.location.pathname.indexOf('/products/edit') >= 0) {
    pageTitle = 'Edit Product'
  }
  if (context.location.pathname.indexOf('/email-campaigns/system-email/edit') >= 0) {
    pageTitle = 'Edit System Email'
  }
  if (context.location.pathname.indexOf('/email-campaigns/broadcast-email/edit') >= 0) {
    pageTitle = 'Edit Broadcast Email'
  }

  return pageTitle;
};
