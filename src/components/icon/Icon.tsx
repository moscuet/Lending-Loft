import { confirmIconString, infoIconString, successIconString } from "./success";

const CustomSvgIcon = ({ fill, icon }: { fill: string, icon: string }) => {
  const svgWithFill = icon.replace('fill="none"', `fill="${fill}"`);
  return <div style={{width:'24px', height:'24px'}} dangerouslySetInnerHTML={{ __html: svgWithFill }} />;

};

const InfoIcon = ({ fill }: { fill: string }) => {
  return <CustomSvgIcon fill={fill} icon={infoIconString} />
}

const SuccessIcon = ({ fill }: { fill: string }) => {
  return <CustomSvgIcon fill={fill} icon={successIconString} />
}

const ConfirmIcon = ({ fill }: { fill: string }) => {
  return <CustomSvgIcon fill={fill} icon={confirmIconString} />
}

export { InfoIcon, SuccessIcon, ConfirmIcon }