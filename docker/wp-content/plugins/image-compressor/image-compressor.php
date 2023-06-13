<?php
/*
Plugin Name: Image Compressor
Plugin URI: ""
Description: Image compressor
Author: Daud
Version: 1
Author URI: ""
*/

// Add action hook
add_filter( 'wp_handle_upload', 'simple_image_compressor_function', 10, 2 );

// Image compression callback
function simple_image_compressor_function( $file, $upload_overrides ) {
    // Check if uploaded file is an image
    $mime_type = $file['type'];
    $allowed_mime_types = array( 'image/jpeg', 'image/jpg', 'image/png', 'image/gif' );
    if ( in_array( $mime_type, $allowed_mime_types ) ) {
        // Get the file path
        $file_path = $file['file'];
        $file_path = str_replace( '/', DIRECTORY_SEPARATOR, $file_path ); // Replace forward slashes with appropriate directory separator

        // Check the file size
        $file_size = filesize( $file_path );
        $max_file_size = 5000000; // 5 MB
        if ( $file_size > $max_file_size ) {
            // If file size exceeds the limit, delete the uploaded file
            unlink( $file_path );
            return $file;
        }

        // Compress the image using the appropriate GD library function based on the MIME type
        if ( $mime_type == 'image/jpeg' || $mime_type == 'image/jpg' ) {
            $image = imagecreatefromjpeg( $file_path );
        } elseif ( $mime_type == 'image/png' ) {
            $image = imagecreatefrompng( $file_path );
        } else {
            $image = false;
        }

        if ( $image ) {
            // Save the compressed image
            if ( $mime_type == 'image/jpeg' || $mime_type == 'image/jpg' ) {
                imagejpeg( $image, $file_path, 75 );
            } elseif ( $mime_type == 'image/png' ) {
                imagepng( $image, $file_path, 9 );
            }

            imagedestroy( $image );

            // Update the file URL to reflect the compressed image
            $file_path_rel = str_replace( wp_upload_dir()['basedir'], '', $file_path );
            $file['url'] = wp_upload_dir()['baseurl'] . $file_path_rel;
        } else {
            // If image creation fails, delete the uploaded file
            unlink( $file_path );
        }
    }

    return $file;
}

