import publicGetters from '@/store/getters.js';
const getters = {
    ...publicGetters,
    userID: state => state.testDemo1.userID,
}
export default getters
