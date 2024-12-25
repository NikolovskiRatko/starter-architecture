<script setup lang="ts">
  import './MegaMenuStyles.scss';
</script>
<template>
  <ul class="kt-menu__content">
    <li class="kt-menu__item">
      <h3 class="kt-menu__heading kt-menu__toggle">
        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot"
          ><span></span></i
        ><span class="kt-menu__link-text">Task Reports</span
        ><i class="kt-menu__ver-arrow la la-angle-right"></i>
      </h3>
      <ul class="kt-menu__inner kt-menu__inner--open">
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><span class="kt-menu__link-icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
                class="kt-svg-icon"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <rect id="bound" x="0" y="0" width="24" height="24" />
                  <path
                    d="M5.84026576,8 L18.1597342,8 C19.1999115,8 20.0664437,8.79732479 20.1528258,9.83390904 L20.8194924,17.833909 C20.9112219,18.9346631 20.0932459,19.901362 18.9924919,19.9930915 C18.9372479,19.9976952 18.8818364,20 18.8264009,20 L5.1735991,20 C4.0690296,20 3.1735991,19.1045695 3.1735991,18 C3.1735991,17.9445645 3.17590391,17.889153 3.18050758,17.833909 L3.84717425,9.83390904 C3.93355627,8.79732479 4.80008849,8 5.84026576,8 Z M10.5,10 C10.2238576,10 10,10.2238576 10,10.5 L10,11.5 C10,11.7761424 10.2238576,12 10.5,12 L13.5,12 C13.7761424,12 14,11.7761424 14,11.5 L14,10.5 C14,10.2238576 13.7761424,10 13.5,10 L10.5,10 Z"
                    id="Combined-Shape"
                    fill="#000000"
                  />
                  <path
                    d="M10,8 L8,8 L8,7 C8,5.34314575 9.34314575,4 11,4 L13,4 C14.6568542,4 16,5.34314575 16,7 L16,8 L14,8 L14,7 C14,6.44771525 13.5522847,6 13,6 L11,6 C10.4477153,6 10,6.44771525 10,7 L10,8 Z"
                    id="Path-53"
                    fill="#000000"
                    fill-rule="nonzero"
                    opacity="0.3"
                  />
                </g></svg></span
            ><span class="kt-menu__link-text">Latest Tasks</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><span class="kt-menu__link-icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
                class="kt-svg-icon"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <polygon id="bound" points="0 0 24 0 24 24 0 24" />
                  <path
                    d="M11.2600599,5.81393408 L2,16 L22,16 L12.7399401,5.81393408 C12.3684331,5.40527646 11.7359848,5.37515988 11.3273272,5.7466668 C11.3038503,5.7680094 11.2814025,5.79045722 11.2600599,5.81393408 Z"
                    id="Path-71"
                    fill="#000000"
                    opacity="0.3"
                  />
                  <path
                    d="M12.0056789,15.7116802 L20.2805786,6.85290308 C20.6575758,6.44930487 21.2903735,6.42774054 21.6939717,6.8047378 C21.8964274,6.9938498 22.0113578,7.25847607 22.0113578,7.535517 L22.0113578,20 L16.0113578,20 L2,20 L2,7.535517 C2,7.25847607 2.11493033,6.9938498 2.31738608,6.8047378 C2.72098429,6.42774054 3.35378194,6.44930487 3.7307792,6.85290308 L12.0056789,15.7116802 Z"
                    id="Combined-Shape"
                    fill="#000000"
                  />
                </g></svg></span
            ><span class="kt-menu__link-text">Pending Tasks</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><span class="kt-menu__link-icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
                class="kt-svg-icon"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <rect id="bound" x="0" y="0" width="24" height="24" />
                  <path
                    d="M7.38979581,2.8349582 C8.65216735,2.29743306 10.0413491,2 11.5,2 C17.2989899,2 22,6.70101013 22,12.5 C22,18.2989899 17.2989899,23 11.5,23 C5.70101013,23 1,18.2989899 1,12.5 C1,11.5151324 1.13559454,10.5619345 1.38913364,9.65805651 L3.31481075,10.1982117 C3.10672013,10.940064 3,11.7119264 3,12.5 C3,17.1944204 6.80557963,21 11.5,21 C16.1944204,21 20,17.1944204 20,12.5 C20,7.80557963 16.1944204,4 11.5,4 C10.54876,4 9.62236069,4.15592757 8.74872191,4.45446326 L9.93948308,5.87355717 C10.0088058,5.95617272 10.0495583,6.05898805 10.05566,6.16666224 C10.0712834,6.4423623 9.86044965,6.67852665 9.5847496,6.69415008 L4.71777931,6.96995273 C4.66931162,6.97269931 4.62070229,6.96837279 4.57348157,6.95710938 C4.30487471,6.89303938 4.13906482,6.62335149 4.20313482,6.35474463 L5.33163823,1.62361064 C5.35654118,1.51920756 5.41437908,1.4255891 5.49660017,1.35659741 C5.7081375,1.17909652 6.0235153,1.2066885 6.2010162,1.41822583 L7.38979581,2.8349582 Z"
                    id="Combined-Shape"
                    fill="#000000"
                    opacity="0.3"
                  />
                  <path
                    d="M14.5,11 C15.0522847,11 15.5,11.4477153 15.5,12 L15.5,15 C15.5,15.5522847 15.0522847,16 14.5,16 L9.5,16 C8.94771525,16 8.5,15.5522847 8.5,15 L8.5,12 C8.5,11.4477153 8.94771525,11 9.5,11 L9.5,10.5 C9.5,9.11928813 10.6192881,8 12,8 C13.3807119,8 14.5,9.11928813 14.5,10.5 L14.5,11 Z M12,9 C11.1715729,9 10.5,9.67157288 10.5,10.5 L10.5,11 L13.5,11 L13.5,10.5 C13.5,9.67157288 12.8284271,9 12,9 Z"
                    id="Combined-Shape"
                    fill="#000000"
                  />
                </g></svg></span
            ><span class="kt-menu__link-text">Urgent Tasks</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><span class="kt-menu__link-icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
                class="kt-svg-icon"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <rect id="bound" x="0" y="0" width="24" height="24" />
                  <path
                    d="M11.6734943,8.3307728 L14.9993074,6.09979492 L14.1213255,5.22181303 C13.7308012,4.83128874 13.7308012,4.19812376 14.1213255,3.80759947 L15.535539,2.39338591 C15.9260633,2.00286161 16.5592283,2.00286161 16.9497526,2.39338591 L22.6066068,8.05024016 C22.9971311,8.44076445 22.9971311,9.07392943 22.6066068,9.46445372 L21.1923933,10.8786673 C20.801869,11.2691916 20.168704,11.2691916 19.7781797,10.8786673 L18.9002333,10.0007208 L16.6692373,13.3265608 C16.9264145,14.2523264 16.9984943,15.2320236 16.8664372,16.2092466 L16.4344698,19.4058049 C16.360509,19.9531149 15.8568695,20.3368403 15.3095595,20.2628795 C15.0925691,20.2335564 14.8912006,20.1338238 14.7363706,19.9789938 L5.02099894,10.2636221 C4.63047465,9.87309784 4.63047465,9.23993286 5.02099894,8.84940857 C5.17582897,8.69457854 5.37719743,8.59484594 5.59418783,8.56552292 L8.79074617,8.13355557 C9.76799113,8.00149544 10.7477104,8.0735815 11.6734943,8.3307728 Z"
                    id="Combined-Shape"
                    fill="#000000"
                  />
                  <polygon
                    id="Path-111"
                    fill="#000000"
                    opacity="0.3"
                    transform="translate(7.050253, 17.949747) rotate(-315.000000) translate(-7.050253, -17.949747) "
                    points="5.55025253 13.9497475 5.55025253 19.6640332 7.05025253 21.9497475 8.55025253 19.6640332 8.55025253 13.9497475"
                  />
                </g></svg></span
            ><span class="kt-menu__link-text">Completed Tasks</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><span class="kt-menu__link-icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
                class="kt-svg-icon"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <rect id="bound" x="0" y="0" width="24" height="24" />
                  <path
                    d="M22,17 L22,21 C22,22.1045695 21.1045695,23 20,23 L4,23 C2.8954305,23 2,22.1045695 2,21 L2,17 L6.27924078,17 L6.82339262,18.6324555 C7.09562072,19.4491398 7.8598984,20 8.72075922,20 L15.381966,20 C16.1395101,20 16.8320364,19.5719952 17.1708204,18.8944272 L18.118034,17 L22,17 Z"
                    id="Combined-Shape"
                    fill="#000000"
                  />
                  <path
                    d="M2.5625,15 L5.92654389,9.01947752 C6.2807805,8.38972356 6.94714834,8 7.66969497,8 L16.330305,8 C17.0528517,8 17.7192195,8.38972356 18.0734561,9.01947752 L21.4375,15 L18.118034,15 C17.3604899,15 16.6679636,15.4280048 16.3291796,16.1055728 L15.381966,18 L8.72075922,18 L8.17660738,16.3675445 C7.90437928,15.5508602 7.1401016,15 6.27924078,15 L2.5625,15 Z"
                    id="Path"
                    fill="#000000"
                    opacity="0.3"
                  />
                  <path
                    d="M11.1288761,0.733697713 L11.1288761,2.69017121 L9.12120481,2.69017121 C8.84506244,2.69017121 8.62120481,2.91402884 8.62120481,3.19017121 L8.62120481,4.21346991 C8.62120481,4.48961229 8.84506244,4.71346991 9.12120481,4.71346991 L11.1288761,4.71346991 L11.1288761,6.66994341 C11.1288761,6.94608579 11.3527337,7.16994341 11.6288761,7.16994341 C11.7471877,7.16994341 11.8616664,7.12798964 11.951961,7.05154023 L15.4576222,4.08341738 C15.6683723,3.90498251 15.6945689,3.58948575 15.5161341,3.37873564 C15.4982803,3.35764848 15.4787093,3.33807751 15.4576222,3.32022374 L11.951961,0.352100892 C11.7412109,0.173666017 11.4257142,0.199862688 11.2472793,0.410612793 C11.1708299,0.500907473 11.1288761,0.615386087 11.1288761,0.733697713 Z"
                    id="Shape"
                    fill="#000000"
                    fill-rule="nonzero"
                    transform="translate(11.959697, 3.661508) rotate(-90.000000) translate(-11.959697, -3.661508) "
                  />
                </g></svg></span
            ><span class="kt-menu__link-text">Failed Tasks</span></a
          >
        </li>
      </ul>
    </li>
    <li class="kt-menu__item">
      <h3 class="kt-menu__heading kt-menu__toggle">
        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot"
          ><span></span></i
        ><span class="kt-menu__link-text">Profit Margins</span
        ><i class="kt-menu__ver-arrow la la-angle-right"></i>
      </h3>
      <ul class="kt-menu__inner">
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><i class="kt-menu__link-bullet kt-menu__link-bullet--line"
              ><span></span></i
            ><span class="kt-menu__link-text">Overall Profits</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><i class="kt-menu__link-bullet kt-menu__link-bullet--line"
              ><span></span></i
            ><span class="kt-menu__link-text">Gross Profits</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><i class="kt-menu__link-bullet kt-menu__link-bullet--line"
              ><span></span></i
            ><span class="kt-menu__link-text">Nett Profits</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><i class="kt-menu__link-bullet kt-menu__link-bullet--line"
              ><span></span></i
            ><span class="kt-menu__link-text">Year to Date Reports</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><i class="kt-menu__link-bullet kt-menu__link-bullet--line"
              ><span></span></i
            ><span class="kt-menu__link-text">Quarterly Profits</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><i class="kt-menu__link-bullet kt-menu__link-bullet--line"
              ><span></span></i
            ><span class="kt-menu__link-text">Monthly Profits</span></a
          >
        </li>
      </ul>
    </li>
    <li class="kt-menu__item">
      <h3 class="kt-menu__heading kt-menu__toggle">
        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot"
          ><span></span></i
        ><span class="kt-menu__link-text">Staff Management</span
        ><i class="kt-menu__ver-arrow la la-angle-right"></i>
      </h3>
      <ul class="kt-menu__inner">
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><i class="kt-menu__link-bullet kt-menu__link-bullet--dot"
              ><span></span></i
            ><span class="kt-menu__link-text">Top Management</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><i class="kt-menu__link-bullet kt-menu__link-bullet--dot"
              ><span></span></i
            ><span class="kt-menu__link-text">Project Managers</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><i class="kt-menu__link-bullet kt-menu__link-bullet--dot"
              ><span></span></i
            ><span class="kt-menu__link-text">Development Staff</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><i class="kt-menu__link-bullet kt-menu__link-bullet--dot"
              ><span></span></i
            ><span class="kt-menu__link-text">Customer Service</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><i class="kt-menu__link-bullet kt-menu__link-bullet--dot"
              ><span></span></i
            ><span class="kt-menu__link-text">Sales and Marketing</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><i class="kt-menu__link-bullet kt-menu__link-bullet--dot"
              ><span></span></i
            ><span class="kt-menu__link-text">Executives</span></a
          >
        </li>
      </ul>
    </li>
    <li class="kt-menu__item">
      <h3 class="kt-menu__heading kt-menu__toggle">
        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot"
          ><span></span></i
        ><span class="kt-menu__link-text">Tools</span
        ><i class="kt-menu__ver-arrow la la-angle-right"></i>
      </h3>
      <ul class="kt-menu__inner">
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><span class="kt-menu__link-text">Analytical Reports</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><span class="kt-menu__link-text">Customer CRM</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><span class="kt-menu__link-text">Operational Growth</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><span class="kt-menu__link-text">Social Media Presence</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><span class="kt-menu__link-text">Files and Directories</span></a
          >
        </li>
        <li class="kt-menu__item" aria-haspopup="true">
          <a href="javascript:;" class="kt-menu__link"
            ><span class="kt-menu__link-text">Audit & Logs</span></a
          >
        </li>
      </ul>
    </li>
  </ul>
</template>
