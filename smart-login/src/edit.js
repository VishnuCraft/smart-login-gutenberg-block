import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ToggleControl } from '@wordpress/components';
import { useState } from 'react';

export default function Edit( { attributes, setAttributes } ) {
	const { 
        usernameLabel, 
        passwordLabel, 
        usernameClass, 
        passwordClass, 
        redirectURL, 
        rememberMe,
        buttonLabel,
        buttonClass 
    } = attributes;

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(false);

	const handleLogin = () => {
		if (!username || !password) {
			setErrorMessage(__('Both fields are required.', 'smart-login'));
		} else {
			setErrorMessage('');

			if (redirectURL) {
				window.location.href = redirectURL;
			}
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Login Settings', 'smart-login' ) }>
					<TextControl
						label={ __( 'Username Field Label', 'smart-login' ) }
						value={ usernameLabel }
						onChange={ ( value ) => setAttributes( { usernameLabel: value } ) }
					/>
					<TextControl
						label={ __( 'Password Field Label', 'smart-login' ) }
						value={ passwordLabel }
						onChange={ ( value ) => setAttributes( { passwordLabel: value } ) }
					/>
					<TextControl
						label={ __( 'Username Field Custom Class', 'smart-login' ) }
						value={ usernameClass }
						onChange={ ( value ) => setAttributes( { usernameClass: value } ) }
					/>
					<TextControl
						label={ __( 'Password Field Custom Class', 'smart-login' ) }
						value={ passwordClass }
						onChange={ ( value ) => setAttributes( { passwordClass: value } ) }
					/>
					<TextControl
						label={ __( 'Redirect URL After Login', 'smart-login' ) }
						value={ redirectURL }
						onChange={ ( value ) => setAttributes( { redirectURL: value } ) }
					/>
					<TextControl
						label={ __( 'Login Button Label', 'smart-login' ) }
						value={ buttonLabel }
						onChange={ ( value ) => setAttributes( { buttonLabel: value } ) }
					/>
					<TextControl
						label={ __( 'Login Button Custom Class', 'smart-login' ) }
						value={ buttonClass }
						onChange={ ( value ) => setAttributes( { buttonClass: value } ) }
					/>
					<ToggleControl
						label={ __( 'Remember Me', 'smart-login' ) }
						checked={ rememberMe }
						onChange={ () => setAttributes( { rememberMe: !rememberMe } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p> }
				<TextControl
					label={ usernameLabel }
					className={ usernameClass }
					value={ username }
					onChange={ ( value ) => setUsername(value) }
					name="sl-username"  
				/>
				<TextControl
					label={ passwordLabel }
					type="password"
					className={ passwordClass }
					value={ password }
					onChange={ ( value ) => setPassword(value) }
					name="sl-password" 
				/>
				<ToggleControl
					label={ __( 'Remember Me', 'smart-login' ) }
					checked={ rememberMe }
					onChange={ () => setAttributes( { rememberMe: !rememberMe } ) }
					name="sl-uremember" 
				/>
				<Button
					isPrimary
					className={ buttonClass } 
					id="wp-smart-login-bk"
					onClick={ handleLogin }
				>
					{ buttonLabel || __( 'Login', 'smart-login' ) }
				</Button>
			</div>
		</>
	);
}
