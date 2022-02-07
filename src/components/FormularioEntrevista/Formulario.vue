<template>
    <div class="contenedor_full">
        <div class="banner_full_">
            <b-button type="button" variant="sm" size="outline-danger" @click="cerrar">Cerrar</b-button>
        </div>
            <b-container fluid>
                <form @submit.prevent="guardar" @keyup="save_storage">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h1>
                                Cuestionario
                            </h1>
                        </b-col>
                        <b-col sm="12" class="mt-3 color_gray">
                            <h4>
                                {{itm.nombre}}
                            </h4>
                        </b-col>
                        <b-col sm="12" class=" color_gray">
                            DPI: {{itm.dpi}}
                        </b-col>
                        <b-col sm="12" class="mt-1">
                            <hr>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <div class="cuestionario">
                                <b-row>
                                    <b-col sm="12" class="mt-3">
                                        <label for="">¿Por qué se quiere congregar en esta iglesia?</label>
                                        <b-form-input type="text" autocomplete="off" v-model="pregunta_1" required size="sm"></b-form-input>
                                    </b-col>
                                    <b-col sm="12" class="mt-3">
                                        <label for="">¿Qué sabe de la cobertura ministerial espiritual?</label>
                                        <b-form-input type="text" autocomplete="off" v-model="pregunta_2" required size="sm"></b-form-input>
                                    </b-col>
                                    <b-col sm="12" class="mt-3">
                                        <label for="">¿Qué piensa de la doctrina de esta iglesia?</label>
                                        <b-form-input type="text" autocomplete="off" v-model="pregunta_3" required size="sm"></b-form-input>
                                    </b-col>
                                    <b-col sm="12" class="mt-3">
                                        <label for="">¿Qué piensa del Pastor de esta iglesia?</label>
                                        <b-form-input type="text" autocomplete="off" v-model="pregunta_4" required size="sm"></b-form-input>
                                    </b-col>
                                    <b-col sm="12" class="mt-3">
                                        <label for="">En obediencia al Ministerio, del 0 al 10 ¿Cómo se califica usted?</label>
                                        <b-form-input type="number" autocomplete="off" v-model="pregunta_5" required size="sm"></b-form-input>
                                    </b-col>
                                    <b-col sm="12" class="mt-3">
                                        <label for="">¿Qué piensa de la alabanza de esta iglesia?</label>
                                        <b-form-input type="text" autocomplete="off" v-model="pregunta_6" required size="sm"></b-form-input>
                                    </b-col>
                                    <b-col sm="12" class="mt-3">
                                        <label for="">¿Qué piensa de la danza?</label>
                                        <b-form-input type="text" autocomplete="off" v-model="pregunta_7" required size="sm"></b-form-input>
                                    </b-col>
                                    <b-col sm="12" class="mt-3">
                                        <label for="">¿Qué piensa del velo?</label>
                                        <b-form-input type="text" autocomplete="off" v-model="pregunta_8" required size="sm"></b-form-input>
                                    </b-col>
                                    <b-col sm="12" class="mt-3">
                                        <label for="">Otras preguntas:</label>
                                        <b-form-input type="text" autocomplete="off" v-model="pregunta_9" required size="sm"></b-form-input>
                                    </b-col>
                                    <b-col sm="12" class="mt-3">
                                        <label for="">Comentarios del entrevistador</label>
                                        <b-form-textarea
                                            size="sm"
                                            placeholder="Comentarios"
                                            autocomplete="off" 
                                            v-model="pregunta_10"
                                            required
                                        ></b-form-textarea>
                                    </b-col>
                                    <b-col sm="12" class="mt-3 mb-3">
                                        <b-button type="submit" variant="success" block size="sm">Guardar</b-button>
                                    </b-col>
                                </b-row>
                            </div>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    name: 'Formulario',
    props:['itm'],
    computed: {
        ...mapState(['datos_formulario'])
    },
    data() {
        return {
            pregunta_1: '',
            pregunta_2: '',
            pregunta_3: '',
            pregunta_4: '',
            pregunta_5: '',
            pregunta_6: '',
            pregunta_7: '',
            pregunta_8: '',
            pregunta_9: '',
            pregunta_10: '',
        }
    },
    methods: {
        cerrar(){
            this.$emit('salir')
        },
        async guardar(){
            let f = {
                api: 'entrevistas',
                pull: false,
                formulario: {
                    dpi: this.itm.dpi,
                    pregunta_1: this.pregunta_1,
                    pregunta_2: this.pregunta_2,
                    pregunta_3: this.pregunta_3,
                    pregunta_4: this.pregunta_4,
                    pregunta_5: this.pregunta_5,
                    pregunta_6: this.pregunta_6,
                    pregunta_7: this.pregunta_7,
                    pregunta_8: this.pregunta_8,
                    pregunta_9: this.pregunta_9,
                    pregunta_10: this.pregunta_10
                }
            }

            await this.saveData(f)
            await this.pullData({api: 'asignacion_entrevistas/c/listado'})

            this.pregunta_1 = ''
            this.pregunta_2 = ''
            this.pregunta_3 = ''
            this.pregunta_4 = ''
            this.pregunta_5 = ''
            this.pregunta_6 = ''
            this.pregunta_7 = ''
            this.pregunta_8 = ''
            this.pregunta_9 = ''
            this.pregunta_10 = ''

            await this.set_datos_formulario('')
            await this.cerrar()


        },
        save_storage(){
            
            let info =  {
                pregunta_1: this.pregunta_1,
                pregunta_2: this.pregunta_2,
                pregunta_3: this.pregunta_3,
                pregunta_4: this.pregunta_4,
                pregunta_5: this.pregunta_5,
                pregunta_6: this.pregunta_6,
                pregunta_7: this.pregunta_7,
                pregunta_8: this.pregunta_8,
                pregunta_9: this.pregunta_9,
                pregunta_10: this.pregunta_10
            }

            let cadena = JSON.stringify(info)
            this.set_datos_formulario(cadena)
            
        },
        restore_storage(){
            if(this.datos_formulario != ''){
                let r = JSON.parse(this.datos_formulario)

                this.pregunta_1 = r.pregunta_1
                this.pregunta_2 = r.pregunta_2
                this.pregunta_3 = r.pregunta_3
                this.pregunta_4 = r.pregunta_4
                this.pregunta_5 = r.pregunta_5
                this.pregunta_6 = r.pregunta_6
                this.pregunta_7 = r.pregunta_7
                this.pregunta_8 = r.pregunta_8
                this.pregunta_9 = r.pregunta_9
                this.pregunta_10 = r.pregunta_10
            }
        },
        ...mapMutations(['set_datos_formulario']),
        ...mapActions(['saveData', 'pullData'])

    },
    mounted() {
        this.restore_storage()
    },
}
</script>

<style>
    .color_gray{
        color: #878b8f;
    }
    .cuestionario{
        
        width: 100%;
        /* height: calc(100% - 140px); */
        height: calc(100vh - 250px);
        padding-right: 15px;
        padding-left: 15px;
        overflow: auto;
    }
</style>