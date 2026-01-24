import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/data/theme';

interface JuInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  isPassword?: boolean;
}

export function JuInput({ label, error, helperText, isPassword, ...props }: JuInputProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: theme.text }]}>{label}</Text>}
      <View style={[
        styles.inputContainer, 
        { 
          borderColor: error ? theme.error : isFocused ? '#0EA5E9' : theme.border,
          backgroundColor: isFocused ? '#F0F9FF' : 'rgba(255, 255, 255, 0.9)',
          shadowColor: isFocused ? '#0EA5E9' : 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: isFocused ? 0.2 : 0,
          shadowRadius: isFocused ? 8 : 0,
          elevation: isFocused ? 2 : 0
        }
      ]}>
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholderTextColor="#94A3B8"
          secureTextEntry={isPassword && !showPassword}
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
        />
        {isPassword && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeBtn}
          >
            {showPassword ? (
              <EyeOff size={20} color="#94A3B8" />
            ) : (
              <Eye size={20} color="#94A3B8" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error ? (
        <Text style={[styles.statusText, { color: theme.error }]}>{error}</Text>
      ) : helperText ? (
        <Text style={[styles.statusText, { color: '#64748B' }]}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  eyeBtn: {
    padding: 8,
    marginLeft: 4,
  },
  statusText: {
    fontSize: 12,
    marginTop: 6,
    paddingLeft: 4,
    fontWeight: '500',
  },
});
