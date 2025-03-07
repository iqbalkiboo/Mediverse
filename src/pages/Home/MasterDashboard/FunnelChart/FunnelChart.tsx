import React, {useEffect, useRef} from 'react';
import {FunnelArrowIcon} from '@/assets/images';

interface Props {
  height?: number;
  topLeftNode?: any;
  topRightNode?: any;
  bottomLeftNode?: any;
  bottomRightNode?: any;
  movingPoint?: number;
  shrinkPoint?: number;
  stageWidth?: number;
  stageColor?: any;
  iconDimension?: number;
  centerXAxis?: number;
  centerYAxis?: number;
  lineWidth?: number;
  labelTextYAxis?: number;
  valueTextYAxis?: number;
  data?: any;
  isLoading: boolean;
}

interface Item {
  label: string;
  value: string;
}

const FunnelChart: React.FC<Props> = (props) => {
  const {
    height = 208,
    topLeftNode = {
      xAxis: 0.535139,
      yAxis: 0.470723,
    },
    topRightNode = {
      xAxis: 168.56884,
      yAxis: 8.218473,
    },
    bottomLeftNode = {
      xAxis: 0.535139,
      yAxis: 205.47072,
    },
    bottomRightNode = {
      xAxis: 168.56884,
      yAxis: 197.72297,
    },
    movingPoint = 169.834601,
    shrinkPoint = 21.61443,
    stageWidth = 170,
    stageColor = ['#745EC8', '#876FE1', '#8E73F4', '#9A82F5'],
    iconDimension = 35,
    centerXAxis = 84.016845,
    centerYAxis = 102.400915,
    labelTextYAxis = 16.029277,
    valueTextYAxis = 11.20723,
    lineWidth = 0.129949,
    data = [],
  } = props;

  const canvas = useRef(null);
  let ctx: any = null;

  useEffect(() => {
    const stageInfo = {
      topLeftNode: {
        xAxis: topLeftNode.xAxis,
        yAxis: topLeftNode.yAxis,
      },
      topRightNode: {
        xAxis: topRightNode.xAxis,
        yAxis: topRightNode.yAxis,
      },
      bottomLeftNode: {
        xAxis: bottomLeftNode.xAxis,
        yAxis: bottomLeftNode.yAxis,
      },
      bottomRightNode: {
        xAxis: bottomRightNode.xAxis,
        yAxis: bottomRightNode.yAxis,
      },
    };

    const canvasEle: any = canvas.current;
    canvasEle.width = data.length * stageWidth;
    canvasEle.height = height;

    ctx = canvasEle.getContext('2d');

    data.forEach((item, index, arr) => {
      if (index !== 0) {
        stageInfo.topLeftNode.xAxis += movingPoint;
        stageInfo.bottomLeftNode.xAxis += movingPoint;
        stageInfo.topRightNode.xAxis += movingPoint;
        stageInfo.bottomRightNode.xAxis += movingPoint;

        stageInfo.topLeftNode.yAxis += shrinkPoint;
        stageInfo.bottomLeftNode.yAxis -= shrinkPoint;
        stageInfo.topRightNode.yAxis += shrinkPoint;
        stageInfo.bottomRightNode.yAxis -= shrinkPoint;
      }

      drawFunnelStage(
          stageInfo,
          item,
          stageColor[index] || stageColor[0],
          index === arr.length - 1,
      );
    });
  }, [data]);

  const drawFunnelStage = (
      info,
      item: Item,
      bgColor: string,
      isLastItem: boolean,
  ) => {
    ctx.beginPath();
    ctx.fillStyle = bgColor;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(info.topLeftNode.xAxis, info.topLeftNode.yAxis);
    ctx.lineTo(info.topRightNode.xAxis, info.topRightNode.yAxis);
    ctx.lineTo(info.bottomRightNode.xAxis, info.bottomRightNode.yAxis);
    ctx.lineTo(info.bottomLeftNode.xAxis, info.bottomLeftNode.yAxis);
    ctx.fill();

    ctx.font = '500 12px jakarta-regular';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(
        item.label,
        info.topLeftNode.xAxis + centerXAxis,
        centerYAxis - labelTextYAxis,
    );

    ctx.font = '700 16px jakarta-regular';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(
        props.isLoading ? '...' : item.value,
        info.topLeftNode.xAxis + centerXAxis,
        centerYAxis + valueTextYAxis,
    );

    if (!isLastItem) {
      drawIcon(
          info.topRightNode.xAxis - iconDimension / 2,
          centerYAxis - iconDimension / 2,
      );
    }
  };

  const drawIcon = (xAxis: number, yAxis: number) => {
    const img = new Image();
    img.src = FunnelArrowIcon;
    img.onload = function() {
      ctx.drawImage(img, xAxis, yAxis, iconDimension, iconDimension);
    };
  };

  return <canvas ref={canvas}></canvas>;
};

export default FunnelChart;
