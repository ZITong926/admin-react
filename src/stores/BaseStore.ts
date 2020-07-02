import { message } from 'antd'
import { action, observable } from 'mobx'

export default class {
  @observable public loadingSet = observable.map(new Map())
  @observable public modalShowSet = observable.map(new Map())
  @observable public inputSetValue = observable.map(new Map())

  @action public changeState = (key: string, value: any) => {
    ;(this as any)[key] = value
  }

  @action public changeObjState = (obj: string, key: string, value: any) => {
    ;(this as any)[obj][key] = value
  }

  @action public changeLoading = (key: string, value: boolean) => {
    this.loadingSet.set(key, value)
  }

  @action public changeModalShow = (key: string, value: boolean) => {
    this.modalShowSet.set(key, value)
  }

  @action public changeInputValueSet = (key: string, value: string) => {
    this.inputSetValue.set(key, value)
  }

  @action public delInputValueKey = (key: string) => {
    this.inputSetValue.delete(key)
  }

  @action public clearAllInputValue = () => {
    this.inputSetValue.clear()
  }

  public successMessage(msg: string) {
    message.success(msg)
  }

  public failMessage(msg: string) {
    message.error(msg)
  }

  public warningMessage(msg: string) {
    message.warning(msg)
  }

  public infoMessage(msg: string) {
    message.info(msg)
  }

  @action public fecthWidthLoading = (lodaingKey: string) => {
    this.loadingSet.set(lodaingKey, true)
    return (asynchronous: Promise<any>) => {
      return asynchronous
        .then((res) => {
          this.loadingSet.set(lodaingKey, false)
          return res
        })
        .catch(() => {
          this.loadingSet.set(lodaingKey, false)
        })
    }
  }
}
