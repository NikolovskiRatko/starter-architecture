<script setup lang="ts">
  import {
    IconSearch,
    IconCompiling,
    IconChartbar3,
    IconEuro,
    IconLayout4blocks,
    IconCart3,
    IconMailattachment,
    IconBox3,
    IconGroup,
  } from "@starter-core/icons";
  import { HeaderUserbar } from "@/components";
  import "./HeaderTopBar.scss";
</script>

<template>
  <!-- begin:: Header Topbar -->
  <div class="kt-header__topbar">
    <!--begin: Search -->

    <!--begin: Search -->
    <div
      id="kt_quick_search_toggle"
      class="kt-header__topbar-item kt-header__topbar-item--search dropdown"
    >
      <div
        class="kt-header__topbar-wrapper"
        data-toggle="dropdown"
        data-offset="10px,0px"
      >
        <span class="kt-header__topbar-icon">
          <IconSearch size="24" />
        </span>
      </div>
      <div
        class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-lg"
      >
        <div
          id="kt_quick_search_inline"
          class="kt-quick-search kt-quick-search--inline"
        >
          <form method="get" class="kt-quick-search__form">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="flaticon2-search-1"
                /></span>
              </div>
              <input
                type="text"
                class="form-control kt-quick-search__input"
                placeholder="Search..."
              />
              <div class="input-group-append">
                <span class="input-group-text"
                  ><i class="la la-close kt-quick-search__close"
                /></span>
              </div>
            </div>
          </form>
          <div
            class="kt-quick-search__wrapper kt-scroll"
            data-scroll="true"
            data-height="300"
            data-mobile-height="200"
          />
        </div>
      </div>
    </div>

    <!--end: Search -->

    <!--end: Search -->

    <!--begin: Notifications -->
    <div class="kt-header__topbar-item dropdown">
      <div
        class="kt-header__topbar-wrapper"
        data-toggle="dropdown"
        data-offset="30px,0px"
        aria-expanded="true"
      >
        <span class="kt-header__topbar-icon kt-pulse kt-pulse--brand">
          <IconCompiling size="24" />
          <span class="kt-pulse__ring" />
        </span>
      </div>
      <div
        class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-lg"
      >
        <form>
          <!--begin: Head -->
          <div
            class="kt-head kt-head--skin-dark kt-head--fit-x kt-head--fit-b"
            style="background-image: url(./assets/media/misc/bg-1.jpg)"
          >
            <h3 class="kt-head__title">
              User Notifications &nbsp;
              <span class="btn btn-success btn-sm btn-bold btn-font-md"
                >23 new</span
              >
            </h3>
            <ul
              class="nav nav-tabs nav-tabs-line nav-tabs-bold nav-tabs-line-3x nav-tabs-line-success kt-notification-item-padding-x"
              role="tablist"
            >
              <li class="nav-item">
                <a
                  class="nav-link active show"
                  data-toggle="tab"
                  href="#topbar_notifications_notifications"
                  role="tab"
                  aria-selected="true"
                  >Alerts</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#topbar_notifications_events"
                  role="tab"
                  aria-selected="false"
                  >Events</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#topbar_notifications_logs"
                  role="tab"
                  aria-selected="false"
                  >Logs</a
                >
              </li>
            </ul>
          </div>

          <!--end: Head -->
          <div class="tab-content">
            <div
              id="topbar_notifications_notifications"
              class="tab-pane active show"
              role="tabpanel"
            >
              <div
                class="kt-notification kt-margin-t-10 kt-margin-b-10 kt-scroll"
                data-scroll="true"
                data-height="300"
                data-mobile-height="200"
              >
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-line-chart kt-font-success" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New order has been received
                    </div>
                    <div class="kt-notification__item-time">2 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-box-1 kt-font-brand" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New customer is registered
                    </div>
                    <div class="kt-notification__item-time">3 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-chart2 kt-font-danger" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      Application has been approved
                    </div>
                    <div class="kt-notification__item-time">3 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-image-file kt-font-warning" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New file has been uploaded
                    </div>
                    <div class="kt-notification__item-time">5 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-bar-chart kt-font-info" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New user feedback received
                    </div>
                    <div class="kt-notification__item-time">8 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-pie-chart-2 kt-font-success" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      System reboot has been successfully completed
                    </div>
                    <div class="kt-notification__item-time">12 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-favourite kt-font-danger" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New order has been placed
                    </div>
                    <div class="kt-notification__item-time">15 hrs ago</div>
                  </div>
                </a>
                <a
                  href="#"
                  class="kt-notification__item kt-notification__item--read"
                >
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-safe kt-font-primary" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      Company meeting canceled
                    </div>
                    <div class="kt-notification__item-time">19 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-psd kt-font-success" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New report has been received
                    </div>
                    <div class="kt-notification__item-time">23 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon-download-1 kt-font-danger" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      Finance report has been generated
                    </div>
                    <div class="kt-notification__item-time">25 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon-security kt-font-warning" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New customer comment recieved
                    </div>
                    <div class="kt-notification__item-time">2 days ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-pie-chart kt-font-success" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New customer is registered
                    </div>
                    <div class="kt-notification__item-time">3 days ago</div>
                  </div>
                </a>
              </div>
            </div>
            <div
              id="topbar_notifications_events"
              class="tab-pane"
              role="tabpanel"
            >
              <div
                class="kt-notification kt-margin-t-10 kt-margin-b-10 kt-scroll"
                data-scroll="true"
                data-height="300"
                data-mobile-height="200"
              >
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-psd kt-font-success" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New report has been received
                    </div>
                    <div class="kt-notification__item-time">23 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon-download-1 kt-font-danger" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      Finance report has been generated
                    </div>
                    <div class="kt-notification__item-time">25 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-line-chart kt-font-success" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New order has been received
                    </div>
                    <div class="kt-notification__item-time">2 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-box-1 kt-font-brand" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New customer is registered
                    </div>
                    <div class="kt-notification__item-time">3 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-chart2 kt-font-danger" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      Application has been approved
                    </div>
                    <div class="kt-notification__item-time">3 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-image-file kt-font-warning" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New file has been uploaded
                    </div>
                    <div class="kt-notification__item-time">5 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-bar-chart kt-font-info" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New user feedback received
                    </div>
                    <div class="kt-notification__item-time">8 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-pie-chart-2 kt-font-success" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      System reboot has been successfully completed
                    </div>
                    <div class="kt-notification__item-time">12 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-favourite kt-font-brand" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New order has been placed
                    </div>
                    <div class="kt-notification__item-time">15 hrs ago</div>
                  </div>
                </a>
                <a
                  href="#"
                  class="kt-notification__item kt-notification__item--read"
                >
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-safe kt-font-primary" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      Company meeting canceled
                    </div>
                    <div class="kt-notification__item-time">19 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-psd kt-font-success" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New report has been received
                    </div>
                    <div class="kt-notification__item-time">23 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon-download-1 kt-font-danger" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      Finance report has been generated
                    </div>
                    <div class="kt-notification__item-time">25 hrs ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon-security kt-font-warning" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New customer comment recieved
                    </div>
                    <div class="kt-notification__item-time">2 days ago</div>
                  </div>
                </a>
                <a href="#" class="kt-notification__item">
                  <div class="kt-notification__item-icon">
                    <i class="flaticon2-pie-chart kt-font-success" />
                  </div>
                  <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">
                      New customer is registered
                    </div>
                    <div class="kt-notification__item-time">3 days ago</div>
                  </div>
                </a>
              </div>
            </div>
            <div
              id="topbar_notifications_logs"
              class="tab-pane"
              role="tabpanel"
            >
              <div class="kt-grid kt-grid--vertical" style="min-height: 200px">
                <div
                  class="kt-grid kt-grid--horizontal kt-grid__item kt-grid__item--fluid kt-grid__item--middle"
                >
                  <div
                    class="kt-grid__item kt-grid__item--middle kt-align-center"
                  >
                    All caught up!
                    <br />No new notifications.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!--end: Notifications -->

    <!--begin: Quick Actions -->
    <div class="kt-header__topbar-item dropdown">
      <div
        class="kt-header__topbar-wrapper"
        data-toggle="dropdown"
        data-offset="30px,0px"
        aria-expanded="true"
      >
        <span class="kt-header__topbar-icon">
          <IconChartbar3 size="24" />
        </span>
      </div>
      <div
        class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl"
      >
        <form>
          <!--begin: Head -->
          <div
            class="kt-head kt-head--skin-dark"
            style="background-image: url(./assets/media/misc/bg-1.jpg)"
          >
            <h3 class="kt-head__title">
              User Quick Actions
              <span class="kt-space-15" />
              <span class="btn btn-success btn-sm btn-bold btn-font-md"
                >23 tasks pending</span
              >
            </h3>
          </div>

          <!--end: Head -->

          <!--begin: Grid Nav -->
          <div class="kt-grid-nav kt-grid-nav--skin-light">
            <div class="kt-grid-nav__row">
              <a href="#" class="kt-grid-nav__item">
                <span class="kt-grid-nav__icon">
                  <IconEuro size="40" />
                </span>
                <span class="kt-grid-nav__title">Accounting</span>
                <span class="kt-grid-nav__desc">eCommerce</span>
              </a>
              <a href="#" class="kt-grid-nav__item">
                <span class="kt-grid-nav__icon">
                  <IconMailattachment size="40" />
                </span>
                <span class="kt-grid-nav__title">Administration</span>
                <span class="kt-grid-nav__desc">Console</span>
              </a>
            </div>
            <div class="kt-grid-nav__row">
              <a href="#" class="kt-grid-nav__item">
                <span class="kt-grid-nav__icon">
                  <IconBox3 size="40" />
                </span>
                <span class="kt-grid-nav__title">Projects</span>
                <span class="kt-grid-nav__desc">Pending Tasks</span>
              </a>
              <a href="#" class="kt-grid-nav__item">
                <span class="kt-grid-nav__icon">
                  <IconGroup size="40" />
                </span>
                <span class="kt-grid-nav__title">Customers</span>
                <span class="kt-grid-nav__desc">Latest cases</span>
              </a>
            </div>
          </div>

          <!--end: Grid Nav -->
        </form>
      </div>
    </div>

    <!--end: Quick Actions -->

    <!--begin: My Cart -->
    <div class="kt-header__topbar-item dropdown">
      <div
        class="kt-header__topbar-wrapper"
        data-toggle="dropdown"
        data-offset="30px,0px"
        aria-expanded="true"
      >
        <span class="kt-header__topbar-icon">
          <IconCart3 size="24" />
        </span>
      </div>
      <div
        class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl"
      >
        <form>
          <!-- begin:: Mycart -->
          <div class="kt-mycart">
            <div
              class="kt-mycart__head kt-head"
              style="background-image: url(./assets/media/misc/bg-1.jpg)"
            >
              <div class="kt-mycart__info">
                <span class="kt-mycart__icon"
                  ><i class="flaticon2-shopping-cart-1 kt-font-success"
                /></span>
                <h3 class="kt-mycart__title">My Cart</h3>
              </div>
              <div class="kt-mycart__button">
                <button type="button" class="btn btn-success btn-sm" style="">
                  2 Items
                </button>
              </div>
            </div>
            <div
              class="kt-mycart__body kt-scroll"
              data-scroll="true"
              data-height="245"
              data-mobile-height="200"
            >
              <div class="kt-mycart__item">
                <div class="kt-mycart__container">
                  <div class="kt-mycart__info">
                    <a href="#" class="kt-mycart__title"> Samsung </a>
                    <span class="kt-mycart__desc">
                      Profile info, Timeline etc
                    </span>
                    <div class="kt-mycart__action">
                      <span class="kt-mycart__price">$ 450</span>
                      <span class="kt-mycart__text">for</span>
                      <span class="kt-mycart__quantity">7</span>
                      <a href="#" class="btn btn-label-success btn-icon"
                        >&minus;</a
                      >
                      <a href="#" class="btn btn-label-success btn-icon"
                        >&plus;</a
                      >
                    </div>
                  </div>
                  <a href="#" class="kt-mycart__pic">
                    <img src="" title="" />
                  </a>
                </div>
              </div>
              <div class="kt-mycart__item">
                <div class="kt-mycart__container">
                  <div class="kt-mycart__info">
                    <a href="#" class="kt-mycart__title"> Panasonic </a>
                    <span class="kt-mycart__desc"> For PHoto & Others </span>
                    <div class="kt-mycart__action">
                      <span class="kt-mycart__price">$ 329</span>
                      <span class="kt-mycart__text">for</span>
                      <span class="kt-mycart__quantity">1</span>
                      <a href="#" class="btn btn-label-success btn-icon"
                        >&minus;</a
                      >
                      <a href="#" class="btn btn-label-success btn-icon"
                        >&plus;</a
                      >
                    </div>
                  </div>
                  <a href="#" class="kt-mycart__pic">
                    <img src="" title="" />
                  </a>
                </div>
              </div>
              <div class="kt-mycart__item">
                <div class="kt-mycart__container">
                  <div class="kt-mycart__info">
                    <a href="#" class="kt-mycart__title"> Fujifilm </a>
                    <span class="kt-mycart__desc">
                      Profile info, Timeline etc
                    </span>
                    <div class="kt-mycart__action">
                      <span class="kt-mycart__price">$ 520</span>
                      <span class="kt-mycart__text">for</span>
                      <span class="kt-mycart__quantity">6</span>
                      <a href="#" class="btn btn-label-success btn-icon"
                        >&minus;</a
                      >
                      <a href="#" class="btn btn-label-success btn-icon"
                        >&plus;</a
                      >
                    </div>
                  </div>
                  <a href="#" class="kt-mycart__pic">
                    <img src="" title="" />
                  </a>
                </div>
              </div>
              <div class="kt-mycart__item">
                <div class="kt-mycart__container">
                  <div class="kt-mycart__info">
                    <a href="#" class="kt-mycart__title"> Candy Machine </a>
                    <span class="kt-mycart__desc"> For PHoto & Others </span>
                    <div class="kt-mycart__action">
                      <span class="kt-mycart__price">$ 784</span>
                      <span class="kt-mycart__text">for</span>
                      <span class="kt-mycart__quantity">4</span>
                      <a href="#" class="btn btn-label-success btn-icon"
                        >&minus;</a
                      >
                      <a href="#" class="btn btn-label-success btn-icon"
                        >&plus;</a
                      >
                    </div>
                  </div>
                  <a href="#" class="kt-mycart__pic">
                    <img src="" title="" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div class="kt-mycart__footer">
              <div class="kt-mycart__section">
                <div class="kt-mycart__subtitel">
                  <span>Sub Total</span>
                  <span>Taxes</span>
                  <span>Total</span>
                </div>
                <div class="kt-mycart__prices">
                  <span>$ 840.00</span>
                  <span>$ 72.00</span>
                  <span class="kt-font-brand">$ 912.00</span>
                </div>
              </div>
              <div class="kt-mycart__button kt-align-right">
                <button type="button" class="btn btn-primary btn-sm">
                  Place Order
                </button>
              </div>
            </div>
          </div>

          <!-- end:: Mycart -->
        </form>
      </div>
    </div>

    <!--end: My Cart -->

    <!--begin: Quick panel toggler -->
    <div
      class="kt-header__topbar-item kt-header__topbar-item--quick-panel"
      data-toggle="kt-tooltip"
      title="Quick panel"
      data-placement="right"
    >
      <span id="kt_quick_panel_toggler_btn" class="kt-header__topbar-icon">
        <IconLayout4blocks size="24" />
      </span>
    </div>

    <!--end: Quick panel toggler -->

    <!--begin: Language bar -->
    <div class="kt-header__topbar-item kt-header__topbar-item--langs">
      <div
        class="kt-header__topbar-wrapper"
        data-toggle="dropdown"
        data-offset="10px,0px"
      >
        <span class="kt-header__topbar-icon">
          <img class="" src="" alt="" />
        </span>
      </div>
      <div
        class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround"
      >
        <ul class="kt-nav kt-margin-t-10 kt-margin-b-10">
          <li class="kt-nav__item kt-nav__item--active">
            <a href="#" class="kt-nav__link">
              <span class="kt-nav__link-icon"><img src="" alt="" /></span>
              <span class="kt-nav__link-text">English</span>
            </a>
          </li>
          <li class="kt-nav__item">
            <a href="#" class="kt-nav__link">
              <span class="kt-nav__link-icon"><img src="" alt="" /></span>
              <span class="kt-nav__link-text">Spanish</span>
            </a>
          </li>
          <li class="kt-nav__item">
            <a href="#" class="kt-nav__link">
              <span class="kt-nav__link-icon"><img src="" alt="" /></span>
              <span class="kt-nav__link-text">German</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!--end: Language bar -->
    <HeaderUserbar />
  </div>

  <!-- end:: Header Topbar -->
</template>
