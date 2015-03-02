{
    init: function(elevators, floors) {

        elevators.map( function (elevator) {
            elevator.on("floor_button_pressed", function(floorNum) { elevator.goToFloor(floorNum); } );
            elevator.on("idle", function() {
                elevator.goToFloor(floors.length / 2);
            });
        });

        floors.map( function(floor) {
            floor.on("up_button_pressed", function() {
                elevators[0].goToFloor(floor.floorNum());
            });
            floor.on("down_button_pressed", function() {
                elevators[1].goToFloor(floor.floorNum());
            });
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}