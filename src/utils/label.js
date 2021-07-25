/* eslint-disable react-hooks/rules-of-hooks */
import { FormattedMessage } from 'umi';
import { useIntl } from 'umi';

// to use for localization
export const t = (id, defaultMessage) => {
  return <FormattedMessage id={id} defaultMessage={defaultMessage} />;
};

export const tLabel = (id, defaultMessage) => {
  const intl = useIntl();
  return intl.formatMessage({ id, defaultMessage });
};
