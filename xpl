Tu deberias recibir BancaId y Usuario .. con eso llamas a /APITest/User/{nombre usuario}/{banca id}  esto es un get y te traera un objeto como este

 let jsonResult = {
            UID:'',
            erroDesc: '',
            error: false,
            Amount: 0,
            User: req.body.User,
            Agente: '',
            AgenteID: '',
            Banca: '',
            BancaID: '',
            Coin: '',
        };

si error es true, debes devolver a otra url que creo que la configuraras en tus environments para que quede parametrizada y podrias poner cordialito.la y ya

Ahora si el error es false, entonces recibiras el objeto con todos los datos de agente , saldo y moneda.

Saldo y moneda debes usarlo para mostrarlo en el header , la info que sale del lado derecho de la pantalla.

esta info debes mantenerla en memoria porq t servira para cualquier llamada q necesites hacer posteriormente.

entonces ya puedes traer hipodromos por AgenteId y una vez cargues eso debes seleccionar el primero para que cargue las carreras asociadas y ahi cargue la primera igualmente.

Ya con eso te cargara inicialmente una carrera de un hipodromo y todo quedaria enlazado.