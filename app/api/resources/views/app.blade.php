<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Character Set Declaration for ensuring the correct character encoding -->
    <meta charset="UTF-8">

    <!-- Browser Compatibility to ensure proper rendering in Internet Explorer -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Responsive Design to make sure the website displays correctly across devices -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Page Description for SEO -->
    <meta name="description" content="Laravel/Vue SPA Admin Panel application">

    <!-- Robots to control search engine behavior: no indexing needed since it is an admin panel -->
    <meta name="robots" content="noindex">

    <!-- Favicon for a recognizable tab icon -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">

    <!-- Theme Color to specify a default color for the browser's address bar -->
    <meta name="theme-color" content="#ADD8E6">

    <title>Starter kit</title>

    <!-- Bootstrap Vite integration -->
    @vite('src/app.ts')

    <!-- Set global base URLs for your JavaScript -->
    <script type="text/javascript">
        var baseUrl = "{{url('/api')}}";
        var baseMetaUrl = "{{url('/')}}";
    </script>
</head>

<body>
    <div id="app" class="app">
        Loading...
    </div>
</body>

</html>