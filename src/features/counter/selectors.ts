import { RootState } from '../../config/store'
// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectCount = (state: RootState) => state.counter.value
