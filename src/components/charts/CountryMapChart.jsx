/* eslint-disable no-else-return */
/* eslint-disable operator-assignment */
/* eslint-disable prefer-template */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable no-var */
import React from 'react';
import { VectorMap } from 'react-jvectormap';
// eslint-disable-next-line no-unused-vars
import styles from './CountryMapChart.less';
import { asPrice } from '@/utils/text'

var colors = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
];

const mapData = {
  IN: 1000,
  RU: 2000,
  AU: 3000,
  BR: 4000,
  FR: 5000,
  US: 6000,
  CN: 8000,
};
const handleClick = () => {};

const CountryMapChart = (props) => {
  return (
    <div>
      <VectorMap
        map={'world_mill'}
        backgroundColor="transparent"
        zoomOnScroll={false}
        height="100%"
        containerStyle={{
          width: '100%',
          height: '300px',
        }}
        onRegionClick={handleClick}
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: '#eff3f6',
            'fill-opacity': 1,
            stroke: 'none',
            'stroke-width': 0,
            'stroke-opacity': 0,
          },
          hover: {
            'fill-opacity': 0.8,
            cursor: 'pointer',
          },
          selected: {
            fill: '#2938bc',
          },
          selectedHover: {},
        }}
        regionsSelectable={true}
        onRegionTipShow={function (e, label, code) {
          if (props.hideHover) {
            e.preventDefault();
          } else {
            let data =
              props.data 
                ? props.data.filter((o) => o.country === code.toString())
                : [];
            let str = '';
            data &&
              data.map((d) => {
                str =
                  str +
                  ('<br><br>' + asPrice(d['amount']));
              });
            if (props.showHover) {
              return label.html(
                '<div style="padding: 10px">' +
                  label.html() +
                  str +
                  '</div>',
              );
            } else {
              return label.html(
                '<div style="padding: 10px">' +
                  label.html() +
                  str +
                  '</div>',
              );
            }
          }
        }}
        series={{
          regions: [
            {
              values: props.obj ? props.obj : mapData,
              scale: colors,
              normalizeFunction: 'polynomial',
            },
          ],
        }}
      />
    </div>
  );
};
export default CountryMapChart;
