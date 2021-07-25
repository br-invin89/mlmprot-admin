import ReactCountryFlag from 'react-country-flag';
import styles from './CountryFlag.less';
import { countryName } from '@/utils/country';

export default function CountryFlag(props) {
  // eslint-disable-next-line prefer-const
  if (props.country) {
    const countryName0 = countryName(props.country);
    return (
      <div className={`${styles.container}`}>
        <ReactCountryFlag countryCode={props.country} svg className={`${styles.imageContainer}`} />
        <span>{countryName0}</span>
      </div>
    );
  }
  return (
    <div className={`${styles.container}`}>
      <ReactCountryFlag countryCode={props.title} svg className={`${styles.imageContainer}`} />
      <span>{props.title}</span>
    </div>
  );
}
