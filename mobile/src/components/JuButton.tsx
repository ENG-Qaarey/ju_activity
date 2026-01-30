import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View, ActivityIndicator } from 'react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

interface JuButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ElementType;
  disabled?: boolean;
  loading?: boolean;
}

export function JuButton({ title, onPress, style, textStyle, variant = 'primary', icon: Icon, disabled, loading }: JuButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          button: { backgroundColor: theme.secondary },
          text: { color: theme.text },
        };
      case 'outline':
        return {
          button: { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.primary },
          text: { color: theme.primary },
        };
      default:
        return {
          button: { backgroundColor: theme.primary },
          text: { color: '#FFFFFF' },
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button, 
        variantStyles.button, 
        style,
        (disabled || loading) && { opacity: 0.5 }
      ]}
    >
      <View style={styles.contentContainer}>
        {loading ? (
            <ActivityIndicator size="small" color={variantStyles.text.color} />
        ) : (
            <>
                {Icon && <Icon size={20} color={variantStyles.text.color} style={styles.icon} />}
                <Text style={[styles.text, variantStyles.text, textStyle]}>
                    {title}
                </Text>
            </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
});
