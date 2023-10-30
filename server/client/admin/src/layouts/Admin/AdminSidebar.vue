<script>
    export default {}
</script>

<template>
    <!-- #Left Sidebar ==================== -->
    <div class="sidebar">
        <div class="sidebar-inner">
            <!-- ### $Sidebar Header ### -->
            <div class="sidebar-logo">
                <div class="peers ai-c fxw-nw">
                    <div class="peer peer-greed">
                        <a class="sidebar-link td-n" href="javascript:void(0);">
                            <div class="peers ai-c fxw-nw">
                                <div class="peer">
                                    <div class="logo">
                                        <img src="build/images/sm_logo.png" alt="">
                                    </div>
                                </div>
                                <div class="peer peer-greed">
                                    <h5 class="lh-1 mB-0 logo-text">Starter</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="peer">
                        <div class="mobile-toggle sidebar-toggle">
                            <a href="" class="td-n">
                                <i class="ti-arrow-circle-left"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ### $Sidebar Menu ### -->
            <ul class="sidebar-menu scrollable pos-r">
                <li class="nav-item mT-30 actived">
                    <router-link class="sidebar-link" :to="{ name: 'dashboard' }">
                        <span class="icon-holder">
                              <i class="c-blue-500 ti-home"></i>
                            </span>
                        <span class="title">Dashboard</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="sidebar-link" :to="{ name: 'users' }">
                        <span class="icon-holder">
                          <i class="c-orange-500 ti-layout-list-thumb"></i>
                        </span>
                        <span class="title">Users</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>