console.log("script jquery active")
$(document).ready(function(){
    let borders = [
      'border-primary', 'border-secondary', 'border-danger', 'border-success', 'border-warning'
    ];
});
function SelectingCheckbox(){
  console.log("Traido desde el archivo externo")
  $(document).ready(function(){
    
    $('#checkBoxHorseAll').click(function () {
        if ($(this).is(":checked")) {
            $(".chkCheckBoxHorseId").prop("checked", true)
            $(".field-number,.value-horses-selected").html('');
            var chkd = $('input.chkCheckBoxHorseId:checkbox:checked');
            var vals = chkd.map(function() {
                return this.value;
            })
            .get().join(', ');
            $(".field-number,.value-horses-selected").append( vals );
            console.log(vals)
        }
        else {
            $(".chkCheckBoxHorseId").prop("checked", false)
            $(".field-number,.value-horses-selected").html('Seleccionar Caballo');
        }
    });
    $('input.chkCheckBoxHorseId:checkbox').on('change', function() {
        $(".field-number,.value-horses-selected").html('');
        let chkd = $('input.chkCheckBoxHorseId:checkbox:checked');
        let vals = chkd.map(function() {
            return this.value;
        })
        .get().join(', ');
        let HorseNumber = vals === "" ? "Selecciona Caballo" : vals;
        $(".field-number,.value-horses-selected").append( HorseNumber );
        console.log(HorseNumber);
    });
  });

}
function EachRaceSelectedToAnotherObject(hipodromo, carrera, carreraDetalle, tipoApuestaUID){
    console.log(carreraDetalle)
    let ArrayTicketDetalles= [];
    let ArrayRunners = [];
    ArrayTicketDetalles = [{
        UID_Carrera: hipodromo,
        UID_Hipodromo: carrera,
        Numbers: carreraDetalle[0].number,
        Runners: ArrayRunners
    }]

      
    $.each(carreraDetalle, function(index, val) {
        /* iterate through array or object */
        console.log(val)
        ArrayRunners.push({
            UID_CarreraDetalle: val.UID_Carrera,
            UID_TipoApuesta: tipoApuestaUID,
            Numero: val.number,
            Posicion: index
        })
        /*
        [{
        UID_CarreraDetalle: val,
        UID_TipoApuesta: val,
        Numero: val,
        Posicion: val
      }]
        Activo: true
        Fecha: "2020-08-22T23:16:20.054Z"
        UID: "d7e8d53246d67f8b84f28f00d1d1f284adf4a035e8a4dac5932961f84fe76ee5"
        UID_Carrera: "e5139e3671dcbef83862c900760c8b4eefb04530207af8e11143ace996ca4fe0"
        age: ""
        distance: ""
        gender: ""
        id: "322530"
        jockey: "L Garcia"
        jockey_id: "2252"
        name: "Voodoo Valley"
        number: "5"
        rating: ""
        stall: ""
        trainer: "E Trujillo"
        trainer_id: "77199"
        wgt: "125"
        */
    });

    return ArrayTicketDetalles;
}