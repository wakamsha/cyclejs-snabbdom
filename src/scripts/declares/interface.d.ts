export type Chapter = {
    title: string;
    demos: Chapter.Demo[]
};

export namespace Chapter {
    export type Demo = {
        directory: string;
        name: string;
    }
}
