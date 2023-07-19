<!DOCTYPE html>
<html lang="en">

<head>
    <title>Admin Panel</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta id="viewporthackid" name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <meta name="application-name" content="{{config('app.name', 'Laravel')}}">
    <meta name="apple-mobile-web-app-title" content="{{config('app.name', 'Laravel')}}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap" rel="stylesheet">

    <!--TODO: Load this font with Yarn-->
    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">

{{--    <link rel="shortcut icon" href="{{url('favicon.ico')}}">--}}
{{--    <link rel="stylesheet" href="{{mix('css/app-admin.css')}}">--}}

    <base href="{{url('/')}}">

    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="">
    <meta name="publisher" content="">
    <meta name="robots" content="index,follow">
    <meta name="revisit-after" content="7 days">
    <link rel="canonical" href="">

    <meta property="og:title" content="">
    <meta property="og:type" content="article">
    <meta property="og:image" content="">

    <meta property="og:url" content="">
    <meta property="og:description" content="">
    <link href="" rel="image_src">

    @vite('src/app.ts')

{{--    <script type="text/javascript">--}}
{{--        var baseUrl = "{{url('/api')}}";--}}
{{--        var baseMetaUrl = "{{url('/')}}";--}}
{{--        var baseDomains = @json(Config::get('app.domains'));--}}
{{--        var gtmKeys = @json(Config::get('constants.gtm_key'));--}}

{{--        window.prerenderReady = false;--}}
{{--    </script>--}}
</head>

<body class="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-aside--enabled">
    <div id="app">
      Loading...
    </div>
</body>
</html>
