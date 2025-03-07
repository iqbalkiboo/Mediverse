import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cx from 'classnames';

import ArrowLeftImage from '@/assets/images/arrow-ios-left.png';
import ArrowDownImage from '@/assets/images/arrow-down.png';
import ArrowUpImage from '@/assets/images/arrow-up.png';
import homeRoute from '@/pages/Home/home.routes';
import MenuIcon from './menuIcon';

import { isEmpty } from 'lodash';
import { bool, func, object } from 'prop-types';

import './sidebar.css';

const Sidebar = ({ children, isCollapse, setIsCollapse, showChatNotif }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [dropdown, setDropdown] = useState({
    status: false,
    index: -0,
  });

  const handleOpenSubMenu = (idxMenu) => {
    if (!isCollapse) {
      setIsCollapse(!isCollapse);
      return;
    }
    setDropdown((prevState): { status: boolean; index: number } => ({
      ...prevState,
      status: prevState.index === idxMenu ? !prevState.status : true,
      index: idxMenu,
    }));
  };

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
    setDropdown((): { status: boolean; index: number } => ({
      status: false,
      index: -0,
    }));
  };

  const hasChild = (name: string) => {
    return homeRoute.filter(
      (item) => item.parent === name && item.active && item.isAuthenticated
    );
  };

  const countChild = (name: string) => {
    const child = homeRoute.filter((item) => item.parent === name);
    return child.length;
  };

  const parentMenu = homeRoute.filter(
    (item) => item.parent === '' && item.active && item.isAuthenticated
  );

  const activeMenu = (routes) => {
    return location.pathname === routes;
  };

  /**
   * TODO: in case use in future
   */
  // const getParentName = (parentName, isCollapse) => {
  //   const child = homeRoute.find((item) => item.routes === location.pathname);
  //   return (child?.parent === parentName && !isCollapse);
  // };

  const hasActiveChild = (name: string) => {
    const child = homeRoute.find(
      (item) => item.parent === name && item.active && activeMenu(item.routes)
    );
    return !isEmpty(child);
  };

  const handleHiddenMenu = (name: string) => {
    if (name === 'dashboard') return false;

    return countChild(name) ? !hasChild(name)?.length : false;
  };

  return (
    <div>
      <div className={cx('sidebar', 'bg-grayBg')}>
        <div
          className={cx('sidebar-container fixed z-10', {
            'w-64': isCollapse,
            'w-24': !isCollapse,
          })}
        >
          <img
            id='sidebar'
            src={ArrowLeftImage}
            alt='arrow-left'
            className={cx(
              'arrow-left rounded-full border-2 border-grayDarkBg',
              {
                'rotate-180': !isCollapse,
              }
            )}
            onClick={() => handleCollapse()}
          />
          <div className={cx('sidebar-menu-wrap')}>
            <ul className={cx('sidebar-menu')}>
              {parentMenu.map((menu, idx) => (
                <div key={idx}>
                  <li
                    className={cx({
                      'border-r-4 border-primary':
                        activeMenu(menu.routes) || hasActiveChild(menu.name),
                    })}
                    onClick={() => {
                      handleOpenSubMenu(idx);
                    }}
                  >
                    <div
                      id={`${menu?.name?.toLowerCase()}-dropdown`}
                      onClick={() => navigate(menu.routes)}
                      className={cx('flex', 'menu-item', {
                        'menu-open justify-between': isCollapse,
                        'dropdown-item': isCollapse,
                        'menu-close justify-center': !isCollapse,
                        active:
                          activeMenu(menu.routes) || hasActiveChild(menu.name),
                        'hover:bg-[#F3EDFF] hover:text-[#4F5B67]': !hasChild(
                          menu.name
                        )?.length,
                        hidden: handleHiddenMenu(menu.name),
                      })}
                    >
                      <div className={cx('flex', 'gap-x-5 items-center')}>
                        <MenuIcon
                          icon={menu.icon}
                          isActive={
                            activeMenu(menu.routes) || hasActiveChild(menu.name)
                          }
                        />
                        <span
                          className={cx('font-xs', 'select-none', {
                            hidden: !isCollapse,
                          })}
                        >
                          {menu.title}
                        </span>
                      </div>
                      {hasChild(menu.name)?.length !== 0 && isCollapse && (
                        <div className='select-none'>
                          <img
                            alt='dropdown-arrow'
                            src={
                              dropdown.index === idx && dropdown.status
                                ? ArrowUpImage
                                : ArrowDownImage
                            }
                          />
                        </div>
                      )}
                      {menu?.name?.toLowerCase() === 'chat' &&
                        showChatNotif && (
                          <div className='select-none'>
                            {isCollapse ? (
                              <div className='animate-pulse chat-badge' />
                            ) : (
                              <div className='animate-pulse chat-badge-small' />
                            )}
                          </div>
                        )}
                    </div>
                  </li>
                  {dropdown.index === idx && dropdown.status && (
                    <li>
                      <ul
                        className={cx('dropdown-menu', {
                          hidden: !dropdown,
                        })}
                      >
                        {hasChild(menu.name).map((item, idx) => (
                          <li
                            key={idx}
                            id={item?.name
                              ?.split('_')
                              ?.join('-')
                              ?.toLowerCase()}
                            className={cx('item', 'menu-item', {
                              'hover:bg-[#F3EDFF] hover:text-[#4F5B67]': true,
                              hidden: !dropdown,
                              active: activeMenu(item.routes),
                            })}
                            onClick={() => {
                              navigate(item.routes);
                            }}
                          >
                            <div
                              className={cx(
                                'item-text select-none flex justify-between ml-4',
                                'items-center mr-2'
                              )}
                            >
                              {item.title}
                              {activeMenu(item.routes) && (
                                <div
                                  className={cx(
                                    'h-2 w-2 rounded-full bg-primary mr-3'
                                  )}
                                ></div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={cx('sidebar-container', {
            'w-64': isCollapse,
            'w-24': !isCollapse,
          })}
        ></div>
        <div className={cx('min-h-full', 'flex-1', 'bg-grayBg', 'w-4/5')}>
          <div className={cx('mt-4', 'mx-6', 'mb-4')}>{children}</div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  children: object,
  isCollapse: bool,
  setIsCollapse: func,
};

export default Sidebar;
