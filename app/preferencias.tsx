import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { OverflowMenu, MenuItem,Button, IndexPath } from "@ui-kitten/components";

export default function preferencias() {

    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(new IndexPath(0));
    const [visible, setVisible] = React.useState(false);
  
    const onItemSelect = (index: IndexPath): void => {
      setSelectedIndex(index);
      setVisible(false);
    };
  
    const renderToggleButton = (): React.ReactElement => (
      <Button onPress={() => setVisible(true)}>
        TOGGLE MENU
      </Button>
    );

    return (
        <SafeAreaView style={styles.container}>
        <Text>Preferencias</Text>
        <OverflowMenu
          anchor={renderToggleButton}
          visible={visible}
          selectedIndex={selectedIndex}
          onSelect={onItemSelect}
          onBackdropPress={() => setVisible(false)}
        >
          <MenuItem title='Users' />
          <MenuItem title='Orders' />
          <MenuItem title='Transactions' />
        </OverflowMenu>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f5f5f5'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 80,
    },
});