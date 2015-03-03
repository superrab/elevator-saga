//Challenge 1
{
    init: function(elevators, floors) {
        //var elevator = elevators[0]; // Let's use the first elevator
        //elevator.on("idle", this.doIdle(elevator));
        
        elevators.map( function (elevator) {
            elevator.on("floor_button_pressed", function(floorNum) {
                elevator.goToFloor(floorNum);
            });
            elevator.on("idle", function() {
                elevator.goToFloor(1);
            });
        });

        floors.map( function(floor) {
            floor.on("up_button_pressed", function() {
                elevators[0].goToFloor(floor.floorNum());
            });
            floor.on("down_button_pressed", function() {
                elevators[0].goToFloor(floor.floorNum());
            });
        });
    },
    update: function(dt, elevators, floors) {},
    doIdle: function(elevator) { elevator.goToFloor(floors.length / 2); }
}
