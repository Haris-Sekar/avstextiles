export const serverHome = async (req,res) =>{
    const html = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href='https://fonts.googleapis.com/css?family=JetBrains Mono' rel='stylesheet'>
        
            <title>avs textiles Server</title>
            <style>
                html,
                body {
                    height: 100%;
                    font-family: 'JetBrains Mono';
                }
        
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    height: 100%;
                }
        
                .title {
                    width: 100%;
                    text-align: center;
                    font-size: 24px;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                    <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
                    <lord-icon src="https://cdn.lordicon.com/jaotthus.json" trigger="loop" delay="2"
                        style="width:250px;height:250px">
                    </lord-icon>
                    <div class="title">
                        Hai!... You have found our server address,<br> but not the routes!!
                    </div>
            </div>
        </body>
        
        </html>`
        res.send(html);
}