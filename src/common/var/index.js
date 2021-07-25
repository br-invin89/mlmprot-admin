import { adminStatusList } from './admin/admin';
import {
  distCenterIsDigitalList,
  distCenterStatusList,
  distCenterShouldShowPhoneList,
  distCenterShouldShowEmailList,
  distCenterIsThirdPartyList,
  distCenterThirdPartyShipperList,
} from './distCenter/distCenter';
import {
  productStatusList,
  productWeightUnitList,
  productIsDigitalList,
  productIsFeaturedList,
  productIsBestSellerList,
  productIsNewList,
  productIsDeletedList,
  productFromSiteList,
} from './product/product';
import { productAvailabilityKind } from './product/productAvailability';
import {
  broadcastEmailReceiverTypeList,
  broadcastEmailStatusList,
  broadcastEmailIsSendEnrollerTreeList,
} from './broadcastEmail/broadcastEmail';

import { cronReporStatusList } from './reports/CronReport';

import { broadcastEmailChunkStatusList } from './broadcastEmail/broadcastEmailChunk';

import { bonusBonusCodeList, bonusStatusList } from './comPlan/bonus';

import { cycleBonusStatusList } from './comPlan/cycleBonus';

import { cyclePayoutTransactionResponseList } from './comPlan/cyclePayoutTransaction';

import { rankStatusList } from './comPlan/rank';

import { userBonusStatusList } from './comPlan/userBonus';

import { userBonusDetailStatusList } from './comPlan/userBonusDetail';
import { userMinusBonusHistoryTypeList } from './comPlan/userMinusBonusHistory';

import { creditPurchaseHistoryTypeList } from './creditWallet/creditPurchaseHistory';
import { creditWithdrawRequestStatusList } from './creditWallet/creditWithdrawRequest';
import { creditWithdrawSettingTypeList } from './creditWallet/creditWithdrawSetting';

import {
  orderRiskScoreIsShipHighRiskList,
  orderRiskScoreIsShipInCityList,
  orderRiskScoreIsBillingInCityList,
  orderRiskScoreIsBillingInIpCountryList,
} from './fraud/orderRiskScore';

import { verificationCodeTypeList } from './fraud/verificationCode';

import { autoshipStatusList } from './order/autoship';
import { autoshipHistoryStatusList } from './order/autoshipHistory';

import {
  orderStatusList,
  orderIsFlaggedList,
  orderSourceList,
  orderOrderFromList,
  orderMerchantResponseList,
  orderIsDigitalList,
  orderIsPcList,
} from './order/order';

import { orderDetailIsRefundedList } from './order/orderDetail';

import {
  orderPaymentTransactionPaymentMethodList,
  orderPaymentTransactionResponseList,
  orderPaymentTransactionTypeList,
} from './order/orderPaymentTransaction';

import { backofficeSliderTypeList } from './setting/backofficeSlider';
import { currencyStatusList } from './setting/currency';
import { featureSettingIsEnabledList } from './setting/featureSetting';
import { merchantStatusList } from './setting/merchant';
import { otherProviderTypeList, otherProviderStatusList } from './setting/otherProvider';
import { payoutProviderStatusList } from './setting/payoutProvider';

import { systemEmailStatusList } from './systemEmail/systemEmail';

import { systemEmailCommonResourceTypeList } from './systemEmail/systemEmailCommonResource';

import { eventStatusList } from './tool/event';

import { newsStatusList } from './tool/news';

import {
  promotionDiscountTypeList,
  promotionDiscountApplicableToList,
  promotionStatusList,
} from './tool/promotion';

import { resourceStatusList, resourceTypeList } from './tool/resource';

import { videoStatusList } from './tool/video';

import { downlineLegPositionList } from './user/downline';

import {
  userTypeList,
  userStatusList,
  userIsPayoutAllowedList,
  userVerificationStatusList,
  userTaxStatusList,
  userShowLeaderboardList,
  userShowContactInfoList,
  userPowerLegList,
  userLegPositionList,
} from './user/user';

import { genealogyUpdateHistoryStatusList } from './user/genealogyUpdateHistory';

import { typeList, priorityList, ticketStatusList } from './support/ticket';

import { userPayoutSettingStatusList } from './user/userPayoutSetting';

import { userTaxFormTypeList, userTaxFormStatusList } from './user/userTaxForm';

import {
  inventoryActionList,
  inventoryReasonsAddList,
  inventoryReasonsRemoveList,
} from './inventory/inventory';

import { userBillingDetailCcTypeList } from './user/userBillingDetail';

import { userVerificationStatusList as userVerificationTableStatusList } from './user/userVerification';

const varList = (varname) => {
  let vars = [];

  if (varname === 'inventory.action') {
    vars = inventoryActionList;
  }
  if (varname === 'inventory.reasonAdd') {
    vars = inventoryReasonsAddList;
  }
  if (varname === 'inventory.reasonRemove') {
    vars = inventoryReasonsRemoveList;
  }

  if (varname === 'admin.status') {
    vars = adminStatusList;
  }

  if (varname === 'broadcastEmail.receiverType') {
    vars = broadcastEmailReceiverTypeList;
  }
  if (varname === 'broadcastEmail.status') {
    vars = broadcastEmailStatusList;
  }
  if (varname === 'broadcastEmail.isSendEnrollerTree') {
    vars = broadcastEmailIsSendEnrollerTreeList;
  }

  if (varname === 'broadcastEmailChunk.status') {
    vars = broadcastEmailChunkStatusList;
  }

  if (varname === 'bonus.bonusCode') {
    vars = bonusBonusCodeList;
  }
  if (varname === 'bonus.status') {
    vars = bonusStatusList;
  }
  if (varname === 'cycleBonus.status') {
    vars = cycleBonusStatusList;
  }

  if (varname === 'cyclePayoutTransaction.response') {
    vars = cyclePayoutTransactionResponseList;
  }
  if (varname === 'rank.status') {
    vars = rankStatusList;
  }
  if (varname === 'userBonus.status') {
    vars = userBonusStatusList;
  }
  if (varname === 'userBonusDetail.status') {
    vars = userBonusDetailStatusList;
  }
  if (varname === 'userMinusBonusHistory.type') {
    vars = userMinusBonusHistoryTypeList;
  }

  if (varname === 'creditPurchaseHistory.type') {
    vars = creditPurchaseHistoryTypeList;
  }
  if (varname === 'creditWithdrawRequest.status') {
    vars = creditWithdrawRequestStatusList;
  }
  if (varname === 'creditWithdrawSetting.type') {
    vars = creditWithdrawSettingTypeList;
  }

  if (varname === 'distCenter.isDigital') {
    vars = distCenterIsDigitalList;
  }
  if (varname === 'distCenter.status') {
    vars = distCenterStatusList;
  }
  if (varname === 'distCenter.shouldShowPhone') {
    vars = distCenterShouldShowPhoneList;
  }
  if (varname === 'distCenter.shouldShowEmail') {
    vars = distCenterShouldShowEmailList;
  }
  if (varname === 'distCenter.isThirdParty') {
    vars = distCenterIsThirdPartyList;
  }
  if (varname === 'distCenter.thirdPartyShipper') {
    vars = distCenterThirdPartyShipperList;
  }

  if (varname === 'orderRiskScore.isShipHighRisk') {
    vars = orderRiskScoreIsShipHighRiskList;
  }
  if (varname === 'orderRiskScore.isShipInCity') {
    vars = orderRiskScoreIsShipInCityList;
  }
  if (varname === 'orderRiskScore.isBillingInCity') {
    vars = orderRiskScoreIsBillingInCityList;
  }
  if (varname === 'orderRiskScore.isBillingInIpCountry') {
    vars = orderRiskScoreIsBillingInIpCountryList;
  }

  if (varname === 'order.status') {
    vars = orderStatusList;
  }
  if (varname === 'order.isFlagged') {
    vars = orderIsFlaggedList;
  }
  if (varname === 'order.source') {
    vars = orderSourceList;
  }
  if (varname === 'order.orderFrom') {
    vars = orderOrderFromList;
  }
  if (varname === 'order.merchantResponse') {
    vars = orderMerchantResponseList;
  }
  if (varname === 'order.isDigital') {
    vars = orderIsDigitalList;
  }
  if (varname === 'order.isPc') {
    vars = orderIsPcList;
  }

  if (varname === 'orderDetail.isRefunded') {
    vars = orderDetailIsRefundedList;
  }
  if (varname === 'orderPaymentTransaction.paymentMethod') {
    vars = orderPaymentTransactionPaymentMethodList;
  }
  if (varname === 'orderPaymentTransaction.response') {
    vars = orderPaymentTransactionResponseList;
  }
  if (varname === 'orderPaymentTransaction.type') {
    vars = orderPaymentTransactionTypeList;
  }

  if (varname === 'verificationCode.type') {
    vars = verificationCodeTypeList;
  }

  if (varname === 'autoship.status') {
    vars = autoshipStatusList;
  }
  if (varname === 'autoshipHistory.status') {
    vars = autoshipHistoryStatusList;
  }

  if (varname === 'product.status') {
    vars = productStatusList;
  }
  if (varname === 'product.weightUnit') {
    vars = productWeightUnitList;
  }
  if (varname === 'product.isDigital') {
    vars = productIsDigitalList;
  }
  if (varname === 'product.isFeatured') {
    vars = productIsFeaturedList;
  }
  if (varname === 'product.isBestSeller') {
    vars = productIsBestSellerList;
  }
  if (varname === 'product.isNew') {
    vars = productIsNewList;
  }
  if (varname === 'product.isDeleted') {
    vars = productIsDeletedList;
  }
  if (varname === 'product.fromSite') {
    vars = productFromSiteList;
  }
  if (varname === 'productAvailability.kind') {
    vars = productAvailabilityKind;
  }
  if (varname === 'backofficeSlider.type') {
    vars = backofficeSliderTypeList;
  }
  if (varname === 'currency.status') {
    vars = currencyStatusList;
  }
  if (varname === 'featureSetting.isEnabled') {
    vars = featureSettingIsEnabledList;
  }
  if (varname === 'merchant.status') {
    vars = merchantStatusList;
  }

  if (varname === 'otherProvider.type') {
    vars = otherProviderTypeList;
  }
  if (varname === 'otherProvider.status') {
    vars = otherProviderStatusList;
  }
  if (varname === 'payoutProvider.status') {
    vars = payoutProviderStatusList;
  }

  if (varname === 'systemEmail.status') {
    vars = systemEmailStatusList;
  }
  if (varname === 'systemEmailCommonResource.type') {
    vars = systemEmailCommonResourceTypeList;
  }
  if (varname === 'event.status') {
    vars = eventStatusList;
  }
  if (varname === 'news.status') {
    vars = newsStatusList;
  }

  if (varname === 'promotion.discountType') {
    vars = promotionDiscountTypeList;
  }
  if (varname === 'promotion.discountApplicableTo') {
    vars = promotionDiscountApplicableToList;
  }
  if (varname === 'promotion.status') {
    vars = promotionStatusList;
  }
  if (varname === 'resource.status') {
    vars = resourceStatusList;
  }
  if (varname === 'resource.type') {
    vars = resourceTypeList;
  }
  if (varname === 'video.status') {
    vars = videoStatusList;
  }

  if (varname === 'downline.legPosition') {
    vars = downlineLegPositionList;
  }

  if (varname === 'user.type') {
    vars = userTypeList;
  }
  if (varname === 'cronReport.status') {
    vars = cronReporStatusList;
  }

  if (varname === 'user.status') {
    vars = userStatusList;
  }
  if (varname === 'user.isPayoutAllowed') {
    vars = userIsPayoutAllowedList;
  }
  if (varname === 'user.verificationStatus') {
    vars = userVerificationStatusList;
  }
  if (varname === 'user.taxStatus') {
    vars = userTaxStatusList;
  }
  if (varname === 'user.showLeaderboard') {
    vars = userShowLeaderboardList;
  }
  if (varname === 'user.showContactInfo') {
    vars = userShowContactInfoList;
  }
  if (varname === 'user.powerLeg') {
    vars = userPowerLegList;
  }
  if (varname === 'user.legPosition') {
    vars = userLegPositionList;
  }
  if (varname === 'userVerification.status') {
    vars = userVerificationTableStatusList;
  }

  if (varname === 'userPayoutSetting.status') {
    vars = userPayoutSettingStatusList;
  }
  if (varname === 'userTaxForm.type') {
    vars = userTaxFormTypeList;
  }
  if (varname === 'userTaxForm.status') {
    vars = userTaxFormStatusList;
  }
  if (varname === 'userBillingDetail.ccType') {
    vars = userBillingDetailCcTypeList;
  }

  if (varname === 'genealogyUpdateHistory.status') {
    vars = genealogyUpdateHistoryStatusList;
  }

  if (varname === 'support.type') {
    vars = typeList;
  }

  if (varname === 'support.priority') {
    vars = priorityList;
  }
  if (varname === 'support.status') {
    vars = ticketStatusList;
  }

  return vars;
};
export const varLabel = (varname, value) => {
  const vars = varList(varname);
  let label = '';
  vars.forEach((el) => {
    if (el.value === value * 1) {
      label = el.label;
    }
  });
  return label;
};
export const varKey = (varname, value) => {
  const vars = varList(varname);
  let key = '';
  vars.forEach((el) => {
    if (el.value === value * 1) {
      key = el.key;
    }
  });
  return key;
};
export const varValue = (varname, key) => {
  const vars = varList(varname);
  let value = '';
  vars.forEach((el) => {
    if (el.key === key) {
      value = el.value;
    }
  });
  return value;
};
export const varOptions = (varname) => {
  const vars = varList(varname);
  const options = [];
  vars.forEach((el) => {
    options.push({
      label: el.label,
      value: el.value,
    });
  });
  return options;
};
export const varOptionsWithDefault = (varname, defaultLabel = '') => {
  const vars = varList(varname);
  const options = [
    {
      label: defaultLabel,
      value: '',
    },
  ];
  vars.forEach((el) => {
    options.push({
      label: el.label,
      value: el.value,
    });
  });
  return options;
};

export const varColor = (varname, value) => {
  const vars = varList(varname);
  let color = '#000';
  vars.forEach((el) => {
    if (el.value === value && el.color) {
      color = el.color;
    }
  });
  return color;
};

export const varBgColor = (varname, value) => {
  const vars = varList(varname);
  let bgColor = '#fff';
  vars.forEach((el) => {
    if (el.value === value && el.bgColor) {
      bgColor = el.bgColor;
    }
  });
  return bgColor;
};
