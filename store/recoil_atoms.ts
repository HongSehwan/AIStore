import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginState = atom({
    key: "loginState",
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const userIdState = atom({
    key: "userIdState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

export const userPwState = atom({
    key: "userPwState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

export const cartState = atom({
    key: "cartState",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const loginChanged = selector({
    key: "loginChanged",
    get: ({ get }) => get(loginState),
    set: ({ set }) => set(loginState, (loginStatus) => (loginStatus = true)),
});

export const logoutChanged = selector({
    key: "logoutChanged",
    get: ({ get }) => get(loginState),
    set: ({ set }) => set(loginState, (loginStatus) => (loginStatus = false)),
});

export const cartAdded = selector({
    key: "cartAdded",
    get: ({ get }) => get(cartState),
    set: ({ set, get }, newValue) => {
        const currentCart = get(cartState);
        const updatedCart = [...currentCart, newValue];
        set(cartState, updatedCart);
    },
});
