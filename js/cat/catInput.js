export default class {
    navigator;
    axis = [];

    constructor(navigator) {
        this.axis = [
            {x:0, y:0},
            {x:0, y:0}
        ];
        this.navigator = navigator;
    }

    /**
     * 更新処理
     */
    update() {
        // getGamepads メソッドに対応している
        if(this.navigator.getGamepads){
            // ------------------------------------------------------------
            // ゲームパッドリストを取得する
            // ------------------------------------------------------------
            const gamepad_list = this.navigator.getGamepads();

            // ------------------------------------------------------------
            // アイテム総数を取得する
            // ------------------------------------------------------------
            const num = gamepad_list.length;

            // ------------------------------------------------------------
            // ゲームパッドを順番に取得する
            // ------------------------------------------------------------
            for(let i = 0; i < num; i++) {
                // ゲームパッドを取得する（undefined 値の場合もある）
                var gamepad = gamepad_list[i];

                // 出力テスト
                if(gamepad && gamepad.connected) {
                    const BOUND_LOW  = 0.05;
                    const BOUND_HIGH = 0.95;

                    var rawX = gamepad.axes[0];
                    var rawY = gamepad.axes[1];

                    var magX = (rawX < 0) ? -rawX : rawX;
                    var magY = (rawY < 0) ? -rawY : rawY;
                    var x = (magX - BOUND_LOW) / (BOUND_HIGH - BOUND_LOW);
                    var y = (magY - BOUND_LOW) / (BOUND_HIGH - BOUND_LOW);
                    if(x < 0.0) {
                        x = 0.0;
                    } else if(x >= 1.0) {
                        x = (rawX < 0) ? -1.0 : 1.0;
                    } else {
                        x = (rawX < 0) ? -x : x;
                    }
                    if(y < 0.0) {
                        y = 0.0;
                    } else if(y >= 1.0) {
                        y = (rawY < 0) ? -1.0 : 1.0;
                    } else {
                        y = (rawY < 0) ? -y : y;
                    }
                    this.axis[0].x = x;
                    this.axis[0].y = y;

                    rawX = gamepad.axes[2];
                    rawY = gamepad.axes[3];

                    magX = (rawX < 0) ? -rawX : rawX;
                    magY = (rawY < 0) ? -rawY : rawY;
                    x = (magX - BOUND_LOW) / (BOUND_HIGH - BOUND_LOW);
                    y = (magY - BOUND_LOW) / (BOUND_HIGH - BOUND_LOW);
                    if(x < 0.0) {
                        x = 0.0;
                    } else if(x >= 1.0) {
                        x = (rawX < 0) ? -1.0 : 1.0;
                    } else {
                        x = (rawX < 0) ? -x : x;
                    }
                    if(y < 0.0) {
                        y = 0.0;
                    } else if(y >= 1.0) {
                        y = (rawY < 0) ? -1.0 : 1.0;
                    } else {
                        y = (rawY < 0) ? -y : y;
                    }
                    this.axis[1].x = x;
                    this.axis[1].y = y;
                } else {
                    this.axis[1].x = 0.0;
                    this.axis[1].y = 0.0;
                }
            }
        }
    }
};
