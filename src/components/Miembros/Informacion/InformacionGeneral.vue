<template>

    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <table class="table table-sm table-striped table-bordered" style="font-size: 11px;">
                    <thead>
                        <tr>
                            <th>
                                Datos
                            </th>
                            <th>---</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="width: 20%;">
                                DPI
                            </td>
                            <td style="width: 80%;">
                                {{recv.dpi}}
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">
                                Dirección
                            </td>
                            <td style="width: 80%;">
                                {{recv.direccion}}
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">
                                Correo
                            </td>
                            <td style="width: 80%;">
                                {{recv.correo}}
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">
                                Fecha de nacimiento
                            </td>
                            <td style="width: 80%;">
                                {{recv.fechadenacimiento | nfecha}} - {{edadactual}} años
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">
                                Estado
                            </td>
                            <td style="width: 80%;">
                                {{recv.estado}}
                            </td>
                        </tr>
                        <tr v-if="recv.estado == 'Fallecido'">
                            <td style="width: 20%;">
                                Fecha Fallecimiento
                            </td>
                            <td style="width: 80%;">
                                {{fechadefallecimiento}}
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">
                                Estado civil
                            </td>
                            <td style="width: 80%;">
                                {{recv.estadocivil}}
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">
                                Profesión
                            </td>
                            <td style="width: 80%;">
                                {{nProfesion}}
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">
                                Ocupación actual
                            </td>
                            <td style="width: 80%;">
                                {{recv.ocupacion}}
                            </td>
                        </tr>
                        <tr v-if="recv.estadocivil == 'Casado'">
                            <td style="width: 20%;">
                                Conygue
                            </td>
                            <td style="width: 80%;">
                                {{recv.conyuge}}
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%;">
                                Número de hijos
                            </td>
                            <td style="width: 80%;">
                                {{recv.nohijos | nonhijos}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'FichaInformacionGeneral',
    props: ['iMiembro'],
    filters:{
        nfecha: function(val){
            return moment(val).format('DD/MM/YYYY')
        },
        nonhijos: function(val){
            return val == 0 ? '-- No tiene --' : val
        }
    },
    data() {
        return {
            edadactual: 0,
            nProfesion: '',
            recv: {}
        }
    },
    methods: {
        
        calcularEdad(){
            const nacimiento = moment(this.recv.fechadenacimiento)
            const hoy = moment()
            this.edadactual = hoy.diff(nacimiento, 'years')
        },
        async convertirProfesion(id){
            let x = await this.convertir({array: 'profesiones', valor: 'id', parametro: id})
            this.nProfesion = x[0].profesion

        },
        async obtenerDatos(){
            
            let f = await this.getData({api: `miembros/${this.iMiembro.dpi}`})
            this.recv = f

            await this.convertirProfesion(f.profesion)
            await this.calcularEdad()

        },
        ...mapActions(['convertir', 'getData'])
    },
    mounted() {
        
        setTimeout(() => {
            this.obtenerDatos()
        }, 1000);
    },
}
</script>

<style>

</style>