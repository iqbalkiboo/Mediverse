import React from 'react';
import cx from 'classnames';

import {Breadcrumb, Heading} from '@/src/components';
import Button from '@/components/Button/Button';
import ButtonBack from '@/components/ButtonBack';
import Typography from '@/src/components/Typography';

import Constants from '@/src/constants';
import {EditIcon} from '@/src/assets/images/svg';
import {imageNull} from '@/assets/images';

interface Props{
  status?: any,
  children: any,
  icon?: string,
  title: string,
  pathBackButton: string,
  subTitle?: any,
  mainTitle?: any,
  onClickEdit?: any,
  buttonAction?: any
  editLabel?: string,
  dropdown?: boolean,
  buttonOptions?: any,
  editButton?: boolean,
  buttonActionEdit?: any,
  buttonBackPath?: string,
  showIcon?: boolean,
  disableEditButton?: boolean
}

const BaseDetail: React.FC<Props> = (props) => {
  return (
    <>
      <div className={cx('flex justify-between')}>
        <Breadcrumb />
        <ButtonBack path={props.pathBackButton} />
      </div>
      <div className={cx(`text-[${Constants.COLORS.BLACK}]`)}>
        <div className={cx('flex justify-between mt-4')}>
          <div>
            <Heading title={`${props.mainTitle}`} customClassName="text-primary font-bold" />
          </div>
          {props.buttonAction}
        </div>
        <div className={cx('container__vendor')}>
          <div className={cx('wrapper__vendor')}>
            {/* Header */}
            <div className={cx('flex justify-between items-center')}>
              <div className={cx('flex items-center gap-x-3')}>
                {
                  props.showIcon &&
                  <div className={cx('w-12 h-12 rounded-full overflow-hidden',
                      'bg-grayDarkBg flex justify-center items-center')}>
                    <img src={props.icon || imageNull} />
                  </div>
                }
                <div>
                  <div className={cx('mt-2')}>
                    <Typography variant={'h1'} color=''>
                      {props.title}
                    </Typography>
                  </div>
                  <div className={cx('mt-2')}>
                    <Typography variant={'bodySmall'} color='text-grayTertiary'>
                      {props.subTitle}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className={cx('flex items-center place-content-end')}>
                {
                  props.status
                }
                {
                  props.buttonActionEdit ?
                  props.buttonActionEdit:
                  (
                    props.editButton &&
                    <Button
                      size='md'
                      iconButton={EditIcon}
                      text={props.editLabel}
                      onClick={props.onClickEdit}
                      disabled={props.disableEditButton}
                    />
                  )
                }
              </div>
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

BaseDetail.defaultProps = {
  dropdown: true,
  showIcon: true,
  editButton: true,
  buttonOptions: [],
  editLabel: 'EDIT',
  onClickEdit: () => {},
  disableEditButton: false,
};

export default BaseDetail;
