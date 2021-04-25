import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {computed, watch} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


export function useLoginForm() {
    const router = useRouter()
    const store = useStore()
    const MIN_LENGTH = 6
    const {handleSubmit, isSubmitting, submitCount} = useForm()

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup.string().trim().required('Введите email').email('Введите корректный email')
    )
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup.string().trim().required('Введите пароль').min(MIN_LENGTH, `Минимальная длина пароля ${MIN_LENGTH} символов`)
    )

    const isToManyAttempts = computed(() => submitCount.value >= 5)

    watch(isToManyAttempts, val => {
        if (val) {
            setTimeout(() => submitCount.value = 0, 30000)
        }
    })

    const onSubmit = handleSubmit(async values => {
      try {
          await store.dispatch('auth/login', values)
          router.push('/admin')
      } catch (e) {

      }
    })

    return {
        email,
        password,
        pError,
        eError,
        pBlur,
        eBlur,
        onSubmit,
        isToManyAttempts,
        isSubmitting
    }
}
