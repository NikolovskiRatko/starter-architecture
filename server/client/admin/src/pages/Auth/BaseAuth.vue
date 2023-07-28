<script setup lang="ts"></script>

<template>
  <div>
    <div class="login-block-main">
      <section class="login-block">
        <!-- Container-fluid starts -->
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <!-- Authentication card start -->
              <form class="md-float-material form-material">
                <div class="auth-box card">
                  <div class="card-block">
                    <div class="text-center mb-4 logo-cont">
                      <img
                        alt="Logo"
                        width="100"
                        height="48"
                        data-sticky-width="82"
                        data-sticky-height="40"
                        src="images/logo.png"
                      >
                    </div>
                    <router-view />
                  </div>
                </div>
              </form>
              <!-- end of form -->
            </div>
            <!-- Authentication card end -->
          </div>
          <!-- end of col-sm-12 -->
        </div>
        <!-- end of row -->

        <!-- end of container-fluid -->
      </section>
    </div>
  </div>
</template>

<style lang="scss">
  .login-block-main {
    background-color: #2a5571;
    font-size: .9375rem;
    overflow-x: hidden;
    color: #333;
    background-image: linear-gradient(rgba(255,255,255,0) 240px, rgb(230, 230, 230) 0%);
    .login-block {
      margin: 30px auto;
      min-height: 93.6vh;
      .admin-logo {
        vertical-align: middle;
      }
      .auth-box {
        margin: 129px auto 0 auto;
        max-width: 450px;
      }
      .logo-cont {
        background-color: #fafafa;
        padding: 1rem 0;
        margin-top: -1.75rem;
        margin-left: -1.25rem;
        margin-right: -1.25rem;
        border-bottom: 1px solid #e6e6e6;
      }

      .card {
        border-radius: 5px;
        -webkit-box-shadow: 0 0 5px 0 rgba(43,43,43,0.1), 0 11px 6px -7px rgba(43,43,43,0.1);
        box-shadow: 0 0 5px 0 rgba(43,43,43,0.1), 0 11px 6px -7px rgba(43,43,43,0.1);
        border: none;
        margin-bottom: 30px;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        overflow: hidden;
      }

      .card-block {
        padding: 1.75rem 1.25rem;
        h3 {
          font-size: 24px;
        }
        input {
          display: inline-block;
          height: 43px;
          width: 100%;
          border: none;
          border-radius: 0;
          font-size: 16px;
          font-weight: 400;
          padding: 0 5px;
          background-color: #fff !important;
          -webkit-box-shadow: none;
          box-shadow: none;
          border-bottom: 1px solid #ccc;
        }
      }
    }
  }

.base-auth {
  height: 100%;
  padding: 0;
  margin: 0;
  form {
    margin-left: auto;
    margin-right: auto;
    margin-top: 35px;
    /*max-width: 380px;*/
    max-width: 100%;
  }
  a.reset {
    font-size: 14px;
    text-transform: none;
  }
  .login-col {
    padding: 0;
  }
  .login-screen,
  .login-row {
    height: 100%;
  }
  .reset-password {
    padding-top: 0px;
  }
  .title {
    color: #000000;
    font-size: 27px;
    font-weight: 500;
    line-height: 1.1;
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    .login-screen {
      form {
        margin-top: 150px;
      }
    }
  }
}
</style>
