import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button
  } from "@nextui-org/react";

function LegendModal({isOpen, onOpenChange}: {
    isOpen: boolean;
    onOpenChange: () => void;
  }) {
  
    const color = ["#2CE574", "#CDF03A", "#FFE500", "#FF9600", "#FF3924"];
    const labels = ["A", "B", "C", "D", "F"];
  
    const legendItems = labels.map((label, index) => ({
      label,
      color: color[index]
    }));
  
    return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop="blur" size="xs">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Pie Chart Legend</ModalHeader>
                <ModalBody style={{color: "black"}}>
                  <ul>
              {legendItems.map((item, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: "center" }}>
                  <span 
                    style={{ 
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      backgroundColor: item.color,
                      marginRight: '10px' 
                    }}
                  />
                  {item.label}
                </li>
              ))}
            </ul>
                </ModalBody>
                <ModalFooter style={{display: "flex", justifyContent: "center"}}>
                  <Button color="primary" onPress={onClose}>
                    OK
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
    </>)
  }

  export default LegendModal;