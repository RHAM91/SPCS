<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-danger" @click="cerrar" size="sm">Cerrar</b-button>
            </div>
            <b-container fluid>
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h3>
                                {{item.nombre}}
                            </h3>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Anciano quien va a entrevistar</label>
                            <select class="form-control form-control-sm" required v-model="anciano">
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in ancianos" :key="index" :value="item.id">{{item.anciano}}</option>
                            </select>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Hora</label>
                            <b-form-input type="time" placeholder="Hora de asginación" required v-model="hora" size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Fecha</label>
                            <b-form-input type="date" v-model="fecha" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-4">
                            <b-button type="submit" variant="success" block size="sm">Asignar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex'
export default {
    name: 'ModalParaAsignar',
    props: ['item'],
    computed: {
        ...mapState(['ancianos'])
    },
    data() {
        return {
            anciano: '',
            hora: '',
            fecha: moment(Date.now()).format('YYYY-MM-DD')
        }
    },
    methods: {
        cerrar(){
            this.$emit('salir')
        },
        async guardar(){
            let f = {
                api: 'asignacion_entrevistas/asignar',
                id: this.item.dpi,
                pull: false,
                modo: 'param',
                formulario: {
                    anciano_asignado: this.anciano,
                    hora_asignacion: this.hora,
                    fecha_asignacion: this.fecha
                }
            }

            await this.updateData(f)
            //await this.pullData({api: 'asignacion_entrevistas/c/listado'})
            await this.pullData({api: 'asignacion_entrevistas'})
            
            this.anciano = ''
            this.hora = ''
            this.fecha = moment(Date.now()).format('YYYY-MM-DD')

            await this.cerrar()
        },
        ...mapActions(['updateData', 'pullData'])
    },
}
</script>

<style>

</style>