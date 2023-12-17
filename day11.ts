// Readonly only applies to non-primitive types.
// Primitive types don't have keys, so "keyof T extends never" filters them out.
type SantaListProtector<T extends Record<PropertyKey, any>> =
    keyof T extends never
        ? T
        : {
              readonly [k in keyof T]: SantaListProtector<T[k]>
          }
