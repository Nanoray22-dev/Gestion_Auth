import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import { Rotate, Zoom } from "react-awesome-reveal";

function Enlaces() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Rotate top left cascade>
        <FontAwesomeIcon
          icon={faTools}
          size="5x"
          className="text-gray-500 mb-4"
        />
      </Rotate>
      <Zoom left cascade>
        <p className="text-gray-700 text-xl">
        Estamos trabajando en esta página. ¡Vuelve pronto!
      </p>
      </Zoom>
      
    </div>
  );
}

export default Enlaces;
