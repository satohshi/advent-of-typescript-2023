type FilterChildrenBy<T, Filter> = T extends Filter ? never : T
