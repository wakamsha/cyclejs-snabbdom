import MouseEvent = createjs.MouseEvent;

export class Ball extends createjs.Shape {

    public vx = 0;
    public vy = 0;
    public mass = 1;

    constructor(public radius: number = 40,
                private color: string = '#ff0000') {
        super();
        this.graphics
            .beginFill(this.color)
            .drawCircle(0, 0, this.radius)
            .endFill();
        this.setBounds(-this.radius, -this.radius, this.radius * 2, this.radius * 2);
    }

    public get isDragging(): boolean {
        return this.hasEventListener('pressmove');
    }

    public enableDrag() {
        if (this.hasEventListener('mousedown')) return;
        this.addEventListener('mousedown', () => this.startDrag());
    }

    public startDrag() {
        this.addEventListener('pressmove', (event: MouseEvent) => this.drag(event));
        this.addEventListener('pressup', () => this.stopDrag());
    }

    public stopDrag() {
        this.removeAllEventListeners('pressmove');
        this.removeAllEventListeners('pressup');
    }

    private drag(event: MouseEvent) {
        this.x = event.stageX;
        this.y = event.stageY;
    }
}
